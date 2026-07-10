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
