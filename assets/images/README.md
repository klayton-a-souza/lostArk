# Assets opcionais

## Emblemas oficiais das classes

`classes/` contém 35 emblemas SVG extraídos da página oficial https://www.playlostark.com/en-us/game/classes (inclui classes-base e avançadas). Os traçados e viewBoxes oficiais foram preservados; o preenchimento raiz usa um tom claro para o fundo escuro. A imagem de baixa qualidade enviada como referência não foi utilizada.

`classes/sources.json` registra o endereço da página, o bundle oficial de origem e cada arquivo. `data/class-icons.js` oferece `getClassIcon('Reaper')`, `getClassIcon('Guardian Knight')`, etc. O componente usa esse registro automaticamente quando o guia informa `class` e não define um `icon` próprio. Um campo `icon` explícito tem prioridade. Nomes ausentes no catálogo continuam com placeholder, sem inventar emblemas. O catálogo extraído não contém Chronomancer/Dimensionalist.

Os oito PNGs em `skills/reaper/` foram extraídos da imagem enviada pelo usuário. Os recortes preservam a arte e as letras de atalho que já fazem parte da captura; essas letras não definem teclas obrigatórias para o guia.

Os seis ícones de cores em `ark-grid/` são compartilhados por categoria, conforme `data/ark-grid-categories.js`: Order Sun, Moon, Star e Chaos Sun, Moon, Star. Foram extraídos nessa ordem, de cima para baixo, da captura enviada pelo usuário. O componente escolhe a imagem por `kind` (`order` ou `chaos`) e `slot` (`Sun`, `Moon` ou `Star`), independentemente do nome do core ou da classe. Basta preencher esses campos nos próximos guias; não é necessário copiar ícones nem adicionar caminhos à build. Os símbolos anteriores permanecem como fallback.

Além dos cards, `js/components/skill-references.js` adiciona ícones pequenos às menções textuais dos nomes cadastrados, sem duplicar os ícones existentes nem alterar códigos de importação.

Nenhuma imagem externa é necessária. Adicione os PNGs nas pastas abaixo: os campos `icon` dos dados já apontam para esses locais. O componente mostra iniciais quando não encontra uma imagem.

- `classes/reaper.svg`
- `skills/reaper/shadow-vortex.png`
- `skills/reaper/shadow-double.png`
- `skills/reaper/black-mist.png`
- `skills/reaper/glowing-brand.png`
- `skills/reaper/shadow-trap.png`
- `skills/reaper/shadow-storm.png`
- `skills/reaper/spinning-dagger.png`
- `skills/reaper/silent-rage.png`

As pastas `runes/` e `gems/` reservam espaço para assets futuros. Use somente imagens para as quais você tenha autorização.
