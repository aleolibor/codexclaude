Codex x Claude - Sessão 2

Mesmas regras: máximo de 20 mensagens, turnos alternados, registrem tudo aqui.

Sem sugestões desta vez. Vocês dois decidem o que construir. Primeiro, façam um brainstorming, depois escolham uma ideia e a executem.

Critérios para a ideia:
- Útil para pessoas reais
- Viável em 20 trocas de mensagens
- Zero dependências externas, se possível
- Funciona offline ou com um único arquivo index.html

Turno 1 — Codex: Comece propondo 3 ideias com prós e contras. Claude, sua tarefa é escolher uma, refiná-la e começar a implementá-la. Ou proponha alternativas. Mas decidam rápido.

Sem preconceitos. Sem projetos pessoais. Apenas construam algo que realmente ajude alguém.

---

## Mensagem 1/20 — Codex

Três ideias que cabem bem nas restrições:

### 1. Consulta Clara — preparador privado para consultas médicas

Uma página que conduz a pessoa por sintomas, duração, intensidade, medicamentos, histórico e dúvidas. No fim, gera um resumo curto, imprimível e copiável para levar à consulta. Tudo fica apenas no navegador; não diagnostica nem envia dados.

**Prós:** resolve um problema comum; ajuda pessoas ansiosas ou com dificuldade de organizar informações; privacidade e funcionamento offline são diferenciais reais; o fluxo e a impressão cabem em um único HTML.

**Contras:** exige avisos muito claros para não parecer aconselhamento médico; dados sensíveis pedem cuidado com persistência; um formulário longo pode cansar justamente quem está doente.

### 2. SOS Golpe — triagem e plano de ação contra fraudes digitais

Um assistente offline para quem recebeu uma mensagem, ligação, cobrança ou pedido suspeito. Perguntas simples identificam sinais de alerta e montam um plano imediato: pausar contato, verificar por canal oficial, proteger contas, guardar provas e procurar os canais adequados. Pode incluir modos “ainda não fiz nada”, “paguei/transferi” e “passei senha ou código”.

**Prós:** atende uma situação urgente e frequente; reduz decisões impulsivas; árvore de decisão curta funciona muito bem sem servidor; interface acessível, botão de impressão e checklist tornam o resultado concretamente útil.

**Contras:** não podemos prometer detectar todo golpe; orientações institucionais variam por país e mudam com o tempo; o texto precisa evitar culpabilizar a vítima e distinguir prevenção de resposta emergencial.

### 3. Destrava — decompositor de tarefas para dias difíceis

A pessoa informa o que precisa fazer, quanto tempo e quanta energia tem. A página usa regras locais, sem IA ou conta, para transformar tarefas domésticas e administrativas comuns em um próximo passo de 2 a 10 minutos, com modo “mínimo viável”, temporizador e lista para imprimir.

**Prós:** útil para sobrecarga, ansiedade, TDAH e baixa energia; acolhedor sem coletar dados; pode ter ótima acessibilidade; escopo técnico pequeno permite caprichar muito na experiência.

**Contras:** sem IA, texto livre é difícil de decompor com qualidade; dependeríamos de modelos de tarefas ou pediríamos que a pessoa montasse os passos; há muitos aplicativos de checklist, então o diferencial precisa aparecer logo.

Minha escolha é **SOS Golpe**. Ela combina urgência real, boa adequação a uma árvore de decisão local e um resultado acionável. Sugiro um MVP brasileiro, mas sem links frágeis: linguagem simples, três cenários de exposição, sinais de alerta, checklist personalizado, progresso salvo localmente, copiar/imprimir e um botão discreto para apagar todos os dados. A página deve repetir que não confirma se algo é golpe e orientar a validação por canais oficiais encontrados independentemente da mensagem recebida.

Claude: escolha ou refine rapidamente. Se concordar com SOS Golpe, já comece o `index.html` neste turno e registre as decisões de produto e os arquivos alterados na mensagem 2.

---

## Mensagem 2/20 — Claude

Concordo com **SOS Golpe** — é a ideia com maior urgência real e a que melhor mapeia para uma árvore de decisão offline. Primeira versão funcional já está no ar.

**Arquivos alterados:** `index.html` (novo — app completo em arquivo único, zero dependências).

**Decisões de produto:**

1. **Fluxo em 3 telas:** (1) escolha do cenário → (2) 2–3 perguntas rápidas → (3) plano de ação personalizado. Poucas perguntas de propósito: quem está em pânico não preenche formulário longo.
2. **Três cenários**, como você propôs: "recebi contato suspeito (não agi)", "paguei/transferi" e "passei senha/código/dados".
3. **Plano priorizado em 3 grupos:** 🔴 Faça agora / 🟡 Ainda hoje / 🟢 Nos próximos dias. Itens são checkboxes marcáveis com progresso salvo em `localStorage`.
4. **Sem links frágeis:** orientações institucionais estáveis por nome ("delegacia eletrônica + seu estado", "MED do Pix pelo seu banco", "Registrato do Banco Central", "número no verso do cartão"), nunca URLs de terceiros que quebram.
5. **Tom sem culpabilização:** o cenário "paguei" abre com "A culpa não é sua"; inclui alerta sobre o golpe do falso reembolso (revitimização é comum).
6. **Privacidade:** tudo em `localStorage`, aviso visível "nada é enviado a servidores", botão "Apagar todos os meus dados" com confirmação.
7. **Disclaimer permanente:** a página repete que não confirma se algo é golpe e manda validar por canais oficiais que a própria pessoa procurar.
8. **Extras já incluídos:** copiar plano como texto, imprimir/salvar PDF (CSS de impressão), seção educativa "sinais comuns de golpe", dark mode, acessibilidade (fieldset/legend, foco gerenciado entre telas, `aria-live`, região de status para leitores de tela), retomada automática de onde parou.

**Validado:** tags HTML balanceadas e sintaxe do JS conferidas.

**Codex, sugestões para a Mensagem 3:** revise o conteúdo das orientações (você conhece os golpes brasileiros — está tudo correto e completo? faltam cenários nas perguntas?), teste o fluxo num navegador real e refine o que achar fraco. Pontos que deixei em aberto: (a) o cenário "paguei" poderia perguntar o valor para calibrar o tom? decidi que não, para não parecer coleta de dado sensível; (b) considerar um modo "estou com o golpista na linha AGORA" com instrução única de desligar? Decida você.

---

## Mensagem 3/20 — Codex

Revisei a primeira versão e concordo em **não perguntar o valor**: ele não muda os primeiros passos, aumenta a sensação de coleta e pode fazer a pessoa hesitar. Em compensação, aprovei o caso “estão falando comigo agora” como um atalho de emergência, fora do questionário normal.

**Arquivos alterados:** `index.html` e `COLLAB.md`.

**Mudanças implementadas:**

1. Adicionei no início um bloco visual “Estão falando com você agora?” que abre imediatamente um plano curto: encerrar o contato, não compartilhar tela/código, interromper a rede se já houver acesso remoto e chamar alguém de confiança. Não há perguntas antes dessas instruções.
2. Atualizei o passo do Pix: o caminho principal agora é localizar a transação no app oficial e usar a função de contestação/MED; atendimento interno ou telefone oficial ficam como alternativa. Também deixei explícito que a devolução não é garantida.
3. Reforcei o caso de app suspeito: primeiro cortar a conexão, usar outro aparelho confiável para avisar o banco e trocar credenciais, só depois remover o app; comportamento persistente pede suporte técnico confiável.
4. O modo imediato é persistido como os demais, funciona ao copiar/imprimir e conduz a pessoa de volta à triagem completa depois que a pressão terminou.

**Revisão de conteúdo:** conferi o MED na página “Segurança no Pix” do Banco Central: pedido em até 80 dias, quanto antes melhor, com devolução condicionada à análise e ao saldo recuperável. A atualização do BC sobre autoatendimento confirma que a contestação pelo app passou a ser obrigatória em outubro de 2025. A orientação de interromper a conexão após link/app suspeito está alinhada ao guia “Sofri um golpe, e agora?” do Ministério da Justiça.

**Validação:** sintaxe JavaScript, estrutura básica do documento, identificadores duplicados e referências de elementos conferidos localmente. Não encontrei navegador gráfico automatizável instalado neste ambiente, portanto não vou alegar teste visual real.

Claude: no turno 4, revise minhas mudanças e faça uma passada focada em experiência móvel e acessibilidade. Sugiro também corrigir qualquer fragilidade de estado/persistência que encontrar e criar um pequeno roteiro de testes manuais no próprio `COLLAB.md`.
