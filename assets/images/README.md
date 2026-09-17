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

## Skills da Dimensionalist

Os oito PNGs em `skills/dimensionalist/` foram recortados da captura fornecida pelo usuário em 17/09/2026, na ordem Needle Strike, Forewarning, Pinpoint Strike, Boundary Break, Cross Thrust, Airsplitter, Temporal Crush e Dimensional Break. Cada recorte preserva os 42 × 44 px disponíveis; a captura corta a extremidade esquerda dos ícones. As letras Q/W/E/R/A/S/D/F fazem parte da imagem e não representam atalhos obrigatórios. Nenhuma imagem de terceiros foi baixada.

## Emblema da Dimensionalist

SVG obtido da [coleção de ícones no Inven](https://www.inven.co.kr/board/lostark/6271/3905703), arquivo `svg/dimension_master.svg` de `svg.zip`. O autor informa extração do site oficial coreano; a origem direta não foi confirmada independentemente. Paths e viewBox preservados; preenchimento branco ajustado para `#ede8d9`, igual à Reaper. Registro compartilhado aplica o ícone à Home, sidebar e cabeçalho. A fonte específica sobrescreve a fonte Global geral em `sources.json`.
