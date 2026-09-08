# Simulado de Geografia — 6º Ano B

Atividade interativa em HTML, CSS e JavaScript para o 3º bimestre, construída a partir dos temas do PDF enviado: estrutura da Terra, placas tectônicas, vulcanismo, erosão, relevo litorâneo, formação dos solos, impactos ambientais urbanos e enchentes.

## Arquivos

- `index.html`: estrutura, enunciados, alternativas e campos dissertativos.
- `styles.css`: identidade visual responsiva e versão para impressão.
- `script.js`: progresso, correção das 7 objetivas, contador de caracteres, impressão e gabarito docente.
- `assets/`: 10 ilustrações SVG locais, uma para cada questão.

## Como usar

Abra `index.html` em um navegador moderno. Não é necessário servidor nem instalação de dependências. Para a melhor experiência, mantenha a pasta `assets/` ao lado dos arquivos principais.

A correção é feita no próprio navegador. As questões 1 a 7 têm gabarito automático; as questões 8 a 10 são dissertativas. O botão **Imprimir atividade** usa a impressão do navegador e esconde os elementos de resultado e a área do professor.

## Personalização

Para trocar nome, série ou cabeçalho, edite os campos dentro de `.student-strip` no `index.html`. Para alterar respostas corretas, edite o objeto `answerKey` em `script.js`.

## Conteúdo e autoria

Os enunciados foram redigidos com base nos conteúdos identificados no PDF fornecido pelo usuário. As ilustrações são SVGs autorais, sem dependência de internet, para garantir que as imagens apareçam mesmo quando a atividade for aberta offline. A décima questão foi alinhada ao levantamento: propor medidas para reduzir erosão, lixo e enchentes em solos urbanos.
