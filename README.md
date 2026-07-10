# SOS Golpe

Uma página offline que ajuda a organizar os próximos passos após um contato suspeito, pagamento fraudulento ou exposição de senhas e dados.

O projeto não tenta decidir se algo é golpe. Ele apresenta orientações educativas em ordem de urgência e lembra a pessoa de confirmar tudo por canais oficiais encontrados de forma independente.

## Como usar

1. Baixe o arquivo [`index.html`](index.html).
2. Abra-o em um navegador atual — não é necessário instalar nada nem iniciar um servidor.
3. Escolha o que aconteceu e responda às perguntas curtas.
4. Marque os passos concluídos, copie o plano ou imprima/salve como PDF.

Também é possível publicar o mesmo `index.html` em qualquer hospedagem de arquivos estáticos.

## Privacidade e funcionamento

- Arquivo único, sem bibliotecas ou dependências externas.
- Nenhuma resposta é enviada pela aplicação.
- Respostas e progresso ficam no `localStorage` do navegador para permitir a retomada.
- O botão “Apagar todos os meus dados desta página” remove esse estado local.
- Funciona offline depois que o arquivo está no aparelho.

## Limites importantes

SOS Golpe é uma ferramenta educativa. Não confirma fraudes, não garante recuperação de valores e não substitui banco, plataforma, polícia, suporte técnico ou orientação profissional. Procedimentos institucionais podem mudar; confirme sempre pelos canais oficiais.

## Desenvolvimento

Não há etapa de build. Edite `index.html` e abra-o diretamente no navegador. Antes de publicar, percorra o roteiro de testes manuais registrado no [`COLLAB.md`](COLLAB.md).
