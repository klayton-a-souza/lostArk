# Lost Ark Build Archive

Site pessoal de guias de builds de Lost Ark para consulta durante o jogo. Guias disponíveis: **Reaper — Lunar Voice 222 Blink**, **Dimensionalist — Time Wilder 222 Spec/Crit**, **Shadowhunter — Demonic Impulse / Ominous 332** e **Valkyrie — Shining Knight 111 Standard**, todos no contexto pós-Ark Grid.

HTML, CSS e JavaScript ES Modules, sem backend, pacotes de produção ou etapa de build. A Home é gerada pelo catálogo de guias, e o mesmo renderer atende todas as builds.

## Rodar localmente

Com Node.js 20 ou superior, na raiz do projeto:

```sh
node scripts/serve.js
```

Abra http://127.0.0.1:4173. Se npm estiver instalado, `npm run dev` faz o mesmo. O servidor escuta apenas no computador local. Para trocar a porta no PowerShell: `$env:PORT = '4174'` antes de iniciar.

Não abra `index.html` por `file://`: ES Modules precisam de um servidor HTTP. Qualquer servidor estático funciona.

## Estrutura e arquitetura

```text
index.html                  Shell, metadados e links dos estilos
data/
  site.js                   Nome e descrição do arquivo
  registry.js               Catálogo de builds
  reaper-lunar-222.js        Conteúdo técnico da Reaper
  dimensionalist-time-wilder-222.js  Conteúdo técnico da Dimensionalist
  shadowhunter-demonic-impulse-332.js  Conteúdo técnico da Shadowhunter
js/
  app.js                    Home, roteamento e interações
  guide-renderer.js         Composição das seções do guia
  components/ui.js          Componentes reutilizáveis
css/
  base.css                  Tema, tipografia, Home e estrutura global
  components.css            Cards, tabelas, badges e fluxos
  guide.css                 Layout do guia e responsividade
assets/
  icons/archive.svg         Marca original e favicon
  images/
    classes/
    skills/reaper/
    runes/
    gems/
    ark-grid/
guides/README.md             Convenção de rotas
scripts/serve.js             Servidor de desenvolvimento sem dependências
tests/guide.test.js          Integridade dos dados e renderização
.nojekyll                    Publicação estática no GitHub Pages
```

Componentes: `guideHeader`, `buildOverview`, `arkCoreCard`, `skillCard`, `runeBadge`, `gemTable`, `rotationBlock`, `rotationSequence`, `recoveryCard`, `engravingList` e `sourceReference`. Helpers compartilham badges, placeholders, escape de texto e fluxos.

As rotas usam `?guide=reaper-lunar-222-blink`, com âncoras como `#rotation`. Links relativos permitem hospedar em `/lostArk/` sem rewrite nem cópias de HTML por personagem. Um ID inexistente mostra uma página com retorno ao catálogo.

## Adding a new guide

### Valkyrie — Shining Knight 111 Standard

Rota: `?guide=valkyrie-shining-knight-111`. Dados em `data/valkyrie-shining-knight-111.js`. Final Words + Knight of Finality + True End; Trinity 3 / Last Light 2; oito skills e 4 Damage + 7 Cooldown Gems, sem gem para Foresight Slash. O conteúdo segue integralmente o briefing fornecido, sem revalidação externa.

Extensões opcionais do renderer: `skillBar`, `skills[].gemNote`, `arkPassivePanels`, `rotationTitle`, `utility` e `engravingGroups`. Gems aceitam `damageRanks`, `cooldownRanks`, `damagePriorities` e `emphasis` para prioridades por grupo sem níveis. Os guias anteriores mantêm os padrões existentes. A legenda de raridades de um preset só aparece quando suas assignments informam raridade.

Assets reutilizados: emblema `assets/images/classes/valkyrie.svg` e categorias `assets/images/ark-grid/order-{sun,moon,star}.png`. Faltam imagens das oito skills e de Final Splendor; usam iniciais do componente `asset`, sem URLs inexistentes. Shining Knight, Awakenings e Cataclysm aparecem em painéis textuais. Runas, engravings e Ark Passive usam os mesmos badges/painéis do projeto, sem imagens adicionais. Nenhum asset foi duplicado. Raridades de runas, códigos numéricos de tripods, import code e fontes externas não foram fornecidos e não foram inventados.

Validação de 19/09/2026: `node --test` passou os 21 testes; `git diff --check` sem erros. Servidor local iniciado; Home com quatro guias, rota da Valkyrie, âncoras e console verificados. Layout inspecionado em desktop (1440), tablet (768) e mobile (390), sem overflow horizontal da página. O projeto não possui etapa de build nem dependências de produção. Testes específicos em `tests/valkyrie.test.js` conferem skills/tripods/runas, cores, identidades Global e as 11 gems sem níveis.

1. Crie um arquivo em `data/`, usando o schema completo da Reaper como modelo.
2. Preencha o conteúdo da nova classe/build com dados documentados. Cada skill deve ter `id` exclusivo dentro da build, nome, tripods, código, rune, rarity, role e caminho opcional de ícone. Gems e blocos referenciam os IDs das skills.
3. Exporte o objeto e adicione-o ao registro. Exemplo do formato da integração:

```js
// data/registry.js — depois de criar e preencher o novo arquivo
import reaper from './reaper-lunar-222.js';
import dimensionalist from './dimensionalist-time-wilder-222.js';

export const guides = [reaper, dimensionalist];
export const getGuide = (id) => guides.find((guide) => guide.id === id);
```

O novo arquivo segue este formato (esqueleto para preenchimento, não uma build verificada):

```js
export default {
  id: 'deathblade-remaining-energy',
  class: 'Deathblade', build: 'Remaining Energy',
  variant: 'Not documented yet', role: 'Not documented yet',
  // Preencha os demais campos seguindo data/reaper-lunar-222.js:
  // overview, stats, arkGrid, skills, skillImport, gems, rotation,
  // recovery, engravings, dpsSpread, sources e metadados.
};
```

Não registre um esqueleto incompleto: o renderer espera o schema completo. Copiar o formato não significa herdar os fatos da Reaper; revise todos os campos. Campos textuais sem documentação devem dizer `Not documented yet`, e coleções ainda sem conteúdo podem ficar vazias. Novas variantes da mesma classe também são novos registros com um `id` único. Não é necessário alterar a Home nem criar outro HTML. Mecânicas inéditas podem exigir a ampliação do schema e um componente genérico correspondente.

Para incluir um parse real no futuro, preencha `dpsSpread` com objetos `{ skill: 'id-da-skill', percentage: valorDocumentado }`. O mesmo componente passa a renderizar os valores. O guia atual mantém a coleção vazia.

## Ícones e identidade

Adicione os arquivos nas rotas descritas em `assets/images/README.md`. Os oito ícones da Reaper já têm os caminhos configurados: ao colocar os PNGs, a interface passa a mostrá-los automaticamente. Sem arquivo, aparecem iniciais; não há download de imagens de terceiros.

O nome e a descrição da Home ficam em `data/site.js`. A marca do header/footer e o título estático ficam em `index.html`. As cores e as fontes tipográficas ficam em `:root`, em `css/base.css`: altere `--font` e `--mono`. Para fontes locais, adicione `@font-face` e os arquivos de fonte aos assets. Nenhuma fonte externa é necessária.

## Fontes e revisão técnica

Cada referência fica em `sources` no arquivo de dados, com `id`, `title`, `type`, `url` e `note`. Os cores podem referenciar a fonte pelo campo `source`.

- **Official:** [Dimensions Unbound](https://www.playlostark.com/en-us/game/releases/dimensions-unbound). Os efeitos informados dos Order Cores foram conferidos em 17/09/2026; não houve divergência. Nenhum dado técnico fornecido foi alterado.
- **Community Tested:** [guia 222 Blink](https://www.inven.co.kr/board/lostark/5647/131126) e [estudo de Specialization/Wealth](https://www.inven.co.kr/board/lostark/5647/130446). São referências comunitárias fornecidas pelo solicitante; as páginas não ficaram acessíveis durante a implementação. A classificação identifica a natureza da referência, não uma revalidação independente nesta entrega. Stats, skills, runas, gems e rotações preservam o briefing.
- A referência visual indicada também não ficou acessível; layout, estilos, componentes e marca foram criados neste projeto, sem copiar código, textos ou imagens desse site.

Atualize `updated`, `reviewLabel`, `verification` e as notas de fonte após cada revisão. Não confunda data editorial com validação completa da build. A interface registra explicitamente a limitação da consulta comunitária.

## Verificação

```sh
node --test
```

Os testes verificam referências internas, oito skills/códigos/runas, 1767 Spec, distribuição de gems, import code exato, loop, ausência de Swoop fixa, renderer de DPS vazio e futuro, e escape de texto. `npm test` é equivalente se npm estiver disponível.

No navegador, confira a Home, abra o card e use as âncoras. `Expanded` abre os nove passos; `Compact` os recolhe. `Copy Code` copia a string original completa e anuncia o resultado. Em contextos sem permissão de clipboard, o código é selecionado para cópia manual. O clipboard exige HTTPS ou localhost.

## Publicar no GitHub Pages

1. Envie os arquivos para um repositório GitHub.
2. Em **Settings → Pages**, escolha **Deploy from a branch**.
3. Selecione sua branch de publicação e a pasta **/(root)**; salve.
4. Quando a publicação concluir, acesse `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

Não há instalação ou build para publicar. `.nojekyll` mantém o site como arquivos estáticos. Home, links de guias, assets e âncoras funcionam no subdiretório do repositório. Esta entrega prepara os arquivos; não configura nem publica um repositório remoto.

## Schema compartilhado — Time Wilder 222

Rota adicionada: `?guide=dimensionalist-time-wilder-222`. A Home continua derivada exclusivamente de `data/registry.js`; a Reaper mantém sua rota e seus dados.

Os componentes de `js/components/guide-panels.js` ampliam o renderer existente:

- `skills[].level`, `code`, `rarity` e `runeAlternative` são opcionais; `tripods` aceita 1–3 entradas. As raridades da Dimensionalist foram fornecidas na revisão incremental de Runes.
- `stats.recommended` numérico mantém a apresentação `1767+`; quando ausente, aparecem `primary` e `secondary`. `stats.bracelet` aceita `{ title, paragraphs }`.
- `arkGrid.priorities` é opcional; `minimumLabel` e `popularityNote` permitem distinguir o núcleo mecânico de um requisito universal. Links de cores usam o tipo real da fonte, sem classificar bases comunitárias como Official.
- `gemTargets` é um mapa de alvos externos à hotbar (`{ id: { name, role } }`). `gems.filler` é opcional. `referenceLevels: { damage, cooldown }`, `referenceLabel` e `upgradeNotes` documentam exemplos sem transformá-los em mínimos. Timeline Skill não é uma nona skill.
- `rotation.type` aceita `block-loop` (padrão retrocompatível) e `priority-cycle`. Este último usa `flow`, `note`, `priorities`, `priorityNote` e `panels: [{ title, paragraphs, flow? }]`.
- `skillImport.alternatives` aceita outros `{ code, note, updated }`, cada um com botão de cópia e fallback manual próprios.
- `runePresets` contém presets completos `{ id, name, isDefault?, shortDescription?, note?, pairNote?, assignments: [{ skill, rune, rarity, popularity?, alternativeNote? }] }`. O primeiro preset marcado `isDefault` (ou o primeiro da lista) inicia ativo. Dois ou mais presets exibem botões com `aria-pressed`; zero ou um não exibem seletor. `js/components/runes.js` alterna painéis completos apenas dentro de Runes, sem reload, URL ou persistência. Níveis, tripods, gems e demais seções permanecem no setup principal. Percentuais ficam em detalhes expansíveis.
- `skillSetupLabel`, `skillSetupNote` e `skillSnapshot: { title, note, entries: [{ skill, usage, levels, tripods, runes }] }` distinguem a recomendação pós-balance dos níveis modais do Bible.
- `engravingAlternatives` e `damagePriority: [{ label, skills }]` são opcionais. `dpsSpread` continua pronto para parses documentados futuros.

Os oito ícones da Dimensionalist foram extraídos da captura fornecida pelo usuário e associados por `skills[].icon` a `assets/images/skills/dimensionalist/<id>.png`. As letras de atalho presentes na captura foram preservadas. O emblema da classe está em `assets/images/classes/dimensionalist.svg`, registrado em `data/class-icons.js`, com a origem comunitária documentada em `assets/images/classes/sources.json`.

A revisão de 17/09/2026 preserva o briefing: Cycle-Optimized (01/08) como principal e Bible Popular / Conviction-Judgment como alternativa. As limitações de validação e as fontes estão em `VALIDATION.md` e na seção Sources do guia.

## Shadowhunter — Demonic Impulse / Ominous 332

Rota: `?guide=shadowhunter-demonic-impulse-332`. Cadastro no mesmo registry, Home automática e renderer compartilhado. O guia contém somente o setup fornecido, com oito skills humanas e onze habilidades demoníacas, incluindo T/V; 5 Damage + 6 Cooldown Gems; Ark Passive; geração de meter; DFXAX; opener, fillers, recovery, synergy e prioridades.

Extensões opcionais do schema, sem dados técnicos herdados das outras classes:

- `demonSkills` usa o mesmo `skillCard` e alimenta runas, gems, prioridades e referências. `key` identifica o atalho; tripods vazios e runas ausentes não geram elementos fictícios.
- `arkPassive: [{ title, tiers: [[tier, value]], note? }]` reutiliza panels e tokens existentes. Navegação e números das seções são derivados de `getSections(guide)`.
- `rotation.type: 'sequence-cycle'` reutiliza `infoPanel`, com `id`, `shortcut`, `flow`, `secondaryFlow`, `paragraphs` e `emphasis`. O destaque DFXAX também aparece em `overview.panels`.
- `skillImport`, `stats.pet` e listas de Chaos Cores podem estar ausentes/vazias, sem conteúdo inventado. `gems.cooldownRankLabel` distingue slots de prioridades quando apenas alguns upgrades são destacados.
- `overview.title`, `arkGrid.title`, `damageTitle`, `demonSkillSetupNote` e `runeNote` mantêm o conteúdo nos dados.

O emblema Shadowhunter e as categorias Order Sun/Moon/Star já existem e são reutilizados. 18 ícones de skills foram extraídos das capturas fornecidas; apenas Blood Demonic Clone (X) aguarda imagem. Origem e convenção documentadas em `assets/images/skills/shadowhunter/README.md`; o fallback são iniciais, sem requisições 404. Não foi fornecido código de importação. Mecânicas preservadas do briefing, sem alegação de revalidação independente.

## Wildsoul — Ferality 222 Bear Build

Rota: `?guide=wildsoul-ferality-222`. Dados em `data/wildsoul-ferality-222.js`; catálogo e navegação usam o registro existente. O guia cobre os três Order Cores 2, stats, engravings, Ark Passive, oito skills, runas flexíveis, onze gemas por prioridade, Destiny, Ferality, opener, loop por gauge, recovery e utility. One-Hit Bear, Ripping Bear e Earthquake Pound ficam fora da barra normal.

Extensões opcionais e retrocompatíveis:

- `runePresets[].skills`: lista completa do preset. Quando presente, o seletor já existente sincroniza cards, barra e painel de runas. Standard usa Vulpine Velocity; Advanced troca apenas esse slot por Tailwind e usa Conviction em Tailwind / Judgment em Ursine Windup. Os cores e as gemas permanecem iguais. Sem esse campo, os presets antigos continuam locais à seção Runes.
- `skills[].category`, `tag` e `runeOptions: { recommended?, alternative?, situational? }`: categorias, destaques e listas de opções sem inventar raridades. `specialSkillGroups` reutiliza os cards para skills externas aos oito slots.
- `arkGrid.order[].expandable`: breakpoints dentro de `details/summary`, acessíveis por clique, teclado e touch. Os cores antigos preservam sua apresentação.
- `runePanels`: explicações adicionais com o componente de painéis existente.

Complemento de raridades: os três cores declaram `rarity: 'Ancient'`, `minimumRarity: 'Relic'` e `breakpoint: 17`, exibidos no card antes dos detalhes expansíveis. A comparação Relic/Ancient de 17P permanece nos breakpoints. `runeOptions` usa objetos `{ name, rarity, note }`; as assignments são derivadas da opção selecionada. Wildsoul agora declara as raridades por skill/preset no briefing Ark Grid 222, incluindo Wealth Epic/Rare, Quick Recharge Legendary, Purify Legendary e o par Conviction/Judgment Legendary. A variante iniciante mantém Vulpine Velocity com Quick Recharge Epic e Ursine Windup com Galewind Legendary. Os guias antigos continuam aceitando nome e raridade separados.

Fonte: briefing fornecido pelo usuário. Bestial Resonance e Bear Frenzy 17P foram conferidos no patch oficial [Dimensions Unbound](https://www.playlostark.com/en-us/game/releases/dimensions-unbound). A revisão não representa validação independente de toda a build. Não foram inventados níveis de skill/gema, códigos de importação, alocação fixa de Bestial Resonance ou tripods de Tailwind.

Assets: emblema Wildsoul e três imagens Order compartilhadas reutilizados. As skills fornecidas possuem ícones recortados das capturas do usuário, incluindo Earthquake Pound. Cards, barra, runas, gemas e referências textuais reutilizam o sistema compartilhado. Origem documentada em `assets/images/skills/wildsoul/README.md`. Engravings e Ark Passive continuam com os mesmos componentes/badges textuais do projeto.
