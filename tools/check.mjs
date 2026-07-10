#!/usr/bin/env node
// Verificação do SOS Golpe sem navegador e sem dependências externas.
// Uso: node tools/check.mjs
// Valida a estrutura do index.html e testa a lógica de buildPlan()
// executando o script embutido em um DOM mínimo simulado.

import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

let failures = 0;
function check(name, cond, detail = "") {
  if (cond) {
    console.log(`  ok  ${name}`);
  } else {
    failures++;
    console.error(`FALHA ${name}${detail ? " — " + detail : ""}`);
  }
}

/* ---------- 1. Estrutura do documento ---------- */

console.log("Estrutura:");
check("doctype html", /^<!DOCTYPE html>/i.test(html.trim()));
check('lang="pt-BR"', /<html lang="pt-BR">/.test(html));
check("meta viewport presente", /name="viewport"/.test(html));
check("noscript presente", /<noscript>/.test(html));

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
check("exatamente 1 bloco <script>", scripts.length === 1);
const js = scripts[0][1];

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
check("IDs únicos", dupIds.length === 0, `duplicados: ${dupIds.join(", ")}`);

const refs = new Set(
  [...js.matchAll(/\$\("([^"]+)"\)/g), ...js.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1])
);
const missing = [...refs].filter((r) => !ids.includes(r));
check("referências JS → IDs resolvem", missing.length === 0, `faltando: ${missing.join(", ")}`);

check("sem URLs externas (http/https) no HTML", !/https?:\/\//.test(html.replace(/registrato\.bcb\.gov\.br/g, "")));

/* ---------- 2. Executa o script num DOM mínimo ---------- */

function fakeEl() {
  return {
    children: [],
    dataset: {},
    style: {},
    value: "",
    checked: false,
    textContent: "",
    innerHTML: "",
    classList: { toggle() {}, add() {}, remove() {} },
    setAttribute() {},
    focus() {},
    select() {},
    remove() {},
    appendChild(c) { this.children.push(c); return c; },
    addEventListener() {},
    querySelector() { return fakeEl(); },
    querySelectorAll() { return []; },
  };
}

const sandbox = {
  document: {
    getElementById: () => fakeEl(),
    querySelector: () => fakeEl(),
    querySelectorAll: () => [],
    createElement: () => fakeEl(),
    body: fakeEl(),
  },
  window: { scrollTo() {}, print() {} },
  localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
  navigator: {},
  confirm: () => false,
  setTimeout: () => 0,
  console,
};
vm.createContext(sandbox);

let api;
try {
  vm.runInContext(js + "\n;var __exports = { buildPlan, SCENARIOS, GROUPS };", sandbox);
  api = sandbox.__exports;
  check("script executa sem erro no DOM simulado", true);
} catch (e) {
  check("script executa sem erro no DOM simulado", false, e.message);
  console.error(`\n${failures} falha(s).`);
  process.exit(1);
}

const { buildPlan, SCENARIOS, GROUPS } = api;

/* ---------- 3. Lógica dos planos ---------- */

console.log("Planos:");
const groupKeys = GROUPS.map((g) => g.key);
const scenarios = ["linha", ...Object.keys(SCENARIOS)];

for (const sc of scenarios) {
  const plan = buildPlan(sc, {});
  const all = groupKeys.flatMap((k) => plan[k]);
  check(`${sc}: plano com respostas vazias não é vazio`, all.length > 0);
  check(`${sc}: sempre há passos em "agora"`, plan.agora.length > 0);
  const itemIds = all.map((i) => i.id);
  check(`${sc}: IDs de itens únicos`, new Set(itemIds).size === itemIds.length);
  check(`${sc}: nenhum item sem texto`, all.every((i) => i.text && i.text.length > 20));
}

// Cobertura: toda opção de resposta precisa mudar o plano ou já estar coberta pelo plano base.
for (const [sc, def] of Object.entries(SCENARIOS)) {
  for (const q of def.questions) {
    for (const opt of q.options) {
      const answers = { [q.id]: q.type === "multi" ? [opt.v] : opt.v };
      const plan = buildPlan(sc, answers);
      const all = groupKeys.flatMap((k) => plan[k]);
      check(`${sc}: resposta ${q.id}=${opt.v} gera plano válido`, all.length > 0);
    }
  }
}

// Conteúdos críticos que não podem regredir silenciosamente
const pix = groupKeys.flatMap((k) => buildPlan("paguei", { metodo: "pix" })[k]).map((i) => i.text).join(" ");
check("paguei/pix cita o MED", /MED/.test(pix));
check("paguei/pix não promete devolução", /não é garantida/.test(pix));

const outro = buildPlan("paguei", { metodo: "outro" }).agora.map((i) => i.text).join(" ");
check("paguei/outro tem orientação específica (B.O.)", /boletim de ocorrência/i.test(outro));

const semMetodo = buildPlan("paguei", {}).agora.map((i) => i.id);
check("paguei sem método aciona fallback", semMetodo.includes("pa_generic"));

const semOque = buildPlan("dados", {}).agora.map((i) => i.id);
check("dados sem seleção aciona fallback", semOque.includes("da_generic"));

const codigo = groupKeys.flatMap((k) => buildPlan("dados", { oque: ["codigo"] })[k]).map((i) => i.text).join(" ");
check("dados/código cita confirmação em duas etapas", /duas etapas/.test(codigo));

const docs = groupKeys.flatMap((k) => buildPlan("dados", { oque: ["docs"] })[k]).map((i) => i.text).join(" ");
check("dados/documentos cita o Registrato", /Registrato/.test(docs));

const linha = buildPlan("linha", {}).agora.map((i) => i.text).join(" ");
check("linha manda encerrar o contato", /Encerre/.test(linha));

const ameacaFisica = buildPlan("ameaca", { tipo: "violencia", perigo: "sim" }).agora.map((i) => i.text).join(" ");
check("ameaça física orienta local seguro e 190", /local seguro/.test(ameacaFisica) && /190/.test(ameacaFisica));

const falsoSequestro = buildPlan("ameaca", { tipo: "sequestro" }).agora.map((i) => i.text).join(" ");
check("falso sequestro manda desligar e verificar", /Desligue/.test(falsoSequestro) && /supostamente sequestrada/.test(falsoSequestro));

const sextorsao = groupKeys.flatMap((k) => buildPlan("ameaca", { tipo: "intimidade" })[k]).map((i) => i.text).join(" ");
check("sextorsão orienta não pagar e preservar provas", /Não pague/.test(sextorsao) && /preserve provas/.test(sextorsao));
check("sextorsão acolhe menores de 18 anos", /menos de 18 anos/.test(sextorsao) && /adulto de confiança/.test(sextorsao));

// Exclusividade declarada corretamente
const pedido = SCENARIOS.nao_agi.questions.find((q) => q.id === "pedido");
check('opção "nada" é exclusiva', pedido.options.find((o) => o.v === "nada")?.exclusive === true);
check("apenas 1 opção exclusiva por pergunta",
  Object.values(SCENARIOS).every((d) =>
    d.questions.every((q) => q.options.filter((o) => o.exclusive).length <= 1)));

/* ---------- Resultado ---------- */

if (failures) {
  console.error(`\n${failures} falha(s).`);
  process.exit(1);
}
console.log("\nTudo certo.");
