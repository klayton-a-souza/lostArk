# Verificação da entrega — 2026-09-17

## Ícones da Shadowhunter — capturas fornecidas

- Extraídos 18 PNGs de 44 × 44 px: oito skills humanas, oito demoníacas e Blood Marsh/Fallen Ruin. Arte e rótulos de teclas preservados das capturas, sem gerar imagens ou alterar os atalhos da build. Origem documentada em `assets/images/skills/shadowhunter/README.md`.
- Somente Blood Demonic Clone (X) não aparece nas capturas e permanece sem ícone. Nenhuma skill extra da terceira captura foi cadastrada.
- Dados apontam para `assets/images/skills/shadowhunter/<id>.png`; os componentes existentes aplicam as imagens aos cards, gems, runas e menções textuais.
- Ajustado `decorateSkillReferences` para reconhecer nomes completos mesmo quando não há imagem: Blood Demonic Clone não herda o ícone da skill humana Demonic Clone. Títulos de Cores preservam apenas o ícone de categoria.
- 19 testes existentes aprovados. Edge/Playwright em 1440, 768, 390 e 320px: 18 imagens com dimensões e alt corretos, fallback de X preservado, sem overflow e sem erros JavaScript/console/HTTP. Caso de nomes sobrepostos verificado no DOM. Capturas desktop/mobile inspecionadas.
- Scripts/capturas de QA em `test-results/`, já ignorado pelo Git. Sem publicação remota.

## Complemento Ark Grid — Shadowhunter / Ominous 332

- Alteração restrita ao conteúdo/renderização de Ark Grid. Dados externos a `arkGrid` e HTML das demais seções da Shadowhunter comparados por SHA-256 antes/depois: idênticos. HTML completo e dados das outras duas classes também permaneceram idênticos.
- Cards existentes `arkCoreCard` ampliados com `position` e detalhes opcionais nos breakpoints: `label`, `tone`, `note`, `flow` e `rarities`. Cards antigos preservam exatamente seu markup anterior. Não foi criado componente independente.
- `infoPanel`, `flow`, `badge`, `summary-card` e os ícones de categoria foram reaproveitados. `infoPanel.chains` permite mostrar os passos de sinergia com nomes completos e teclas. Sem sistema novo de tooltip; explicações textuais no próprio contexto.
- Ominous Sun 3, Demonic Clone Moon 3 e Critical Claws Star 2: 10P, 14P, 17P e 18–20P detalhados conforme o complemento fornecido. 17P mostra Relic/Ancient explicitamente: +5%/+6%, +18%/+20% e +9%/+14%. Casting Speed de Blood Demonic Clone +20% em ambas as raridades. Scaling +0.2% em cada um dos pontos 18/19/20.
- “Why 332 Works” conecta Demonize, Destiny, Destiny: Ominous, Chaos Sliver ×2, Frenzied Chaos e os dois X. Comparação visual Gameplay / Power Spike / Scaling, com distinção de que Critical Claws 14P é um ganho de dano. Prioridades Relic/Ancient e loop DFXAX preservados.
- `node --test`: 19 testes aprovados, incluindo efeitos/valores, pares de raridade, escape e compatibilidade dos cards anteriores.
- Edge/Playwright em 1440, 1024, 768, 390 e 320px: sem overflow da página ou dos cards/breakpoints/fluxos; sem erros JavaScript, console ou HTTP. Doze blocos de breakpoint, seis valores Relic/Ancient e teclas DFXAX conferidos no DOM. Navegação por teclado até Ark Grid validada.
- Capturas de desktop/mobile inspecionadas. Cards empilham em tablet/mobile; comparações de raridade continuam lado a lado; fluxos quebram linha. Estilos adicionais limitados aos novos detalhes.

Arquivos alterados neste complemento: `data/shadowhunter-demonic-impulse-332.js`, `js/components/ui.js`, `js/components/guide-panels.js`, `js/guide-renderer.js`, `css/components.css`, `tests/shadowhunter.test.js` e `VALIDATION.md`.

Artefatos locais de QA (ignorados pelo Git): `test-results/shadowhunter-cores-check.mjs` e capturas `test-results/cores-<largura>-<bloco>.png`, nas cinco larguras acima, para os cards 0/1/2, interaction e progression. Sem publicação remota; os efeitos seguem o conteúdo fornecido, sem alegação de validação independente do jogo.

## Shadowhunter — Demonic Impulse / Ominous 332

- Guia integrado à Home e ao renderer existente em `?guide=shadowhunter-demonic-impulse-332`.
- `node --test`: 17 testes aprovados. Incluem regressões de Reaper/Dimensionalist, registro/âncoras, referências das gems, setup humano, teclas demoníacas, runas/raridades, Cores, engravings e sequência DFXAX.
- Edge headless / Playwright, servidor local `node scripts/serve.js`: três guias testados em 1440, 768, 390 e 320 px. Nenhum overflow horizontal da página, erro JavaScript/console ou resposta HTTP >=400. Assets existentes carregados; ícones pendentes não geram requisições.
- Home com três cards; entrada na Shadowhunter por teclado (Enter), âncoras internas válidas e rota desconhecida com retorno ao catálogo.
- Shadowhunter: 8 cards humanos, 11 demoníacos, 8 runas fixas, 11 gems, 3 Order Cores e 13 seções principais. D → F → X → A → X conferido no DOM. Ark Passive e painéis de rotação reutilizam o tema e os componentes existentes.
- Reaper: Expanded/Compact continua mostrando/recolhendo os nove passos. Dimensionalist: seletor Bible Popular continua ativando seu painel e par de runas.
- Capturas desktop/mobile inspecionadas. Fluxos usam wrap; raridades têm rótulos textuais, teclas têm badges e os ícones têm alt, acompanhados pelos nomes visíveis.
- `git diff --check`: sem erros. Arquivos de dados das classes anteriores não foram alterados. Sem commit, push ou publicação remota.

### Limitações e decisões

- Os 19 ícones reais das skills não estão disponíveis no repositório. Fallback de iniciais do componente existente; pasta e instruções criadas para inserção posterior. Emblema Shadowhunter e categorias Ark Grid reutilizados.
- Conteúdo técnico segue o briefing fornecido, sem revalidação independente. Rising Claw usa a opção fornecida Naively Honest. Não foram inventados pontos de Core, código de importação, pet, runas ausentes ou percentuais de DPS.
- O schema anterior não tinha Ark Passive nem uma segunda lista de habilidades por forma. Foram acrescentados campos opcionais e suporte no renderer compartilhado, sem duplicar páginas ou alterar as rotas existentes. A ordem geral da Reaper foi preservada.
- `skillImport` e `stats.pet` tornaram-se opcionais; Chaos Cores vazios não exibem seção. `sequence-cycle` reutiliza os painéis/fluxos existentes; gems, runas e prioridades resolvem também `demonSkills`. Cooldown Gems mostra slots e destaca somente as duas prioridades fornecidas.
- A consulta ao site publicado não ficou acessível pela ferramenta web. A integração e a validação usaram os arquivos do projeto local.

### Inventário desta implementação

Criados (código/documentação):

- `data/shadowhunter-demonic-impulse-332.js`
- `tests/shadowhunter.test.js`
- `assets/images/skills/shadowhunter/README.md`

Modificados:

- `data/registry.js`
- `js/app.js`
- `js/guide-renderer.js`
- `js/components/ui.js`
- `js/components/guide-panels.js`
- `js/components/runes.js`
- `css/guide.css`
- `tests/guide.test.js`
- `README.md`
- `VALIDATION.md`

Artefatos locais de verificação criados em `test-results/` (pasta já ignorada pelo Git):

- `shadowhunter-check.mjs`
- `shadowhunter-1440-ark-grid.png`
- `shadowhunter-1440-ark-passive.png`
- `shadowhunter-1440-core-loop.png`
- `shadowhunter-1440-demon-skills.png`
- `shadowhunter-1440-gems.png`
- `shadowhunter-1440-opener.png`
- `shadowhunter-1440-overview.png`
- `shadowhunter-1440-recovery.png`
- `shadowhunter-1440-runes.png`
- `shadowhunter-1440-skills.png`
- `shadowhunter-390-ark-grid.png`
- `shadowhunter-390-ark-passive.png`
- `shadowhunter-390-core-loop.png`
- `shadowhunter-390-demon-skills.png`
- `shadowhunter-390-gems.png`
- `shadowhunter-390-opener.png`
- `shadowhunter-390-overview.png`
- `shadowhunter-390-recovery.png`
- `shadowhunter-390-runes.png`
- `shadowhunter-390-skills.png`

## Emblemas das classes

- 35 SVGs extraídos do catálogo oficial de classes, com origem registrada em `assets/images/classes/sources.json`.
- Reaper usa `reaper.svg`; carregamento e aparência conferidos na Home.
- Registro compartilhado resolve nomes de classes para uso nos próximos guias.
- Seis testes existentes aprovados após a integração.

## Atualização de ícones das skills

- Oito PNGs extraídos da captura fornecida e associados pelos nomes exibidos nela.
- Os oito ícones carregaram no navegador com dimensão nativa de 44 × 44 px.
- Ícones aplicados a cards, gems, rotação e referências textuais; símbolos dos seis cores preservados.
- `node --test`: seis testes continuam aprovados; módulo de referências passou na verificação de sintaxe.

## Verificação inicial

- `node --test`: 6 testes aprovados.
- Home aberta no navegador e card da Reaper utilizado para entrar no guia.
- Guia renderiza 8 Skill Cards, 4 Rotation Blocks e todas as 11 seções de navegação.
- Botão Copy Code anuncia sucesso; clipboard do Windows comparado com a string original de 128 caracteres: idêntico.
- Expanded abre a sequência de 9 passos; estado `aria-expanded` e conteúdo visível conferidos.
- Desktop de 1440 px, tablet de 768 px e celulares de 390 e 320 px sem transbordamento horizontal da página. Inspeção visual da Home, overview desktop e rotação mobile.
- Ícones ausentes mostram iniciais. Requisições 404 desses PNGs opcionais são esperadas até os assets serem adicionados.
- Efeitos informados dos Order Cores conferidos com Dimensions Unbound. Fontes da comunidade não acessíveis na consulta; dados preservados do briefing e limitação documentada no guia.
- Arquivos preparados para GitHub Pages; publicação remota não executada.

Ambiente: Node.js 24.19.0. npm não está disponível no PATH desta sessão; servidor e testes foram executados diretamente com Node, sem instalação de dependências.


## Dimensionalist / Time Wilder / 222 — revisão de 2026-09-17

- Novo guia: `?guide=dimensionalist-time-wilder-222`. Home com dois registros; rota e arquivo de dados da Reaper preservados.
- Filtro Bible: classId=dimension_master; classEngraving=First; arkGridCores=673001706,673011706,673021706; minIlvl=1700; maxIlvl=1810. Os percentuais vêm do briefing, que relata screenshots da revisão; os screenshots não foram revalidados independentemente nesta implementação.
- Principal: Cycle-Optimized 222 Setup — Post-Balance, atualização de 01/08/2026. Pinpoint Strike Lv14, Needle Strike Lv11 e Forewarning Lv7 (dois tripods). As oito skills permanecem na hotbar.
- Alternativa: Bible Population Snapshot, níveis modais e todos os percentuais de uso/tripods/runes em painel próprio. Não é um único pacote obrigatório de rotação.
- Preset A: Forewarning Rage + Dimensional Break Galewind; Airsplitter Quick Recharge. Preset B: Forewarning Conviction + Dimensional Break Judgment; Airsplitter Rage ou Quick Recharge. As oito atribuições de cada preset são exibidas separadamente.
- Gems: 6 Damage + 5 Cooldown, sem filler. Timeline Skill é gem target separado. Níveis Lv7/Lv8 são referência do guia de 01/08, não mínimos universais. Substituição histórica Pinpoint Strike CD → Airsplitter CD documentada.
- Rotação por prioridades, identity, burst padrão, triple Dimensional Break avançado, Awakening/Z, Spacebar, keybinds de exemplo e sete casos de recovery incluídos.

### Import codes exatos

Primary / Post-Balance Cycle Code — 2026-08-01:

```text
EEDB6EDA73A7D87B4FAAA4EB5AE267CB37888CE3E3CC56529EA5DCBA375A9D8DED191D2C0EA620C748647139D97AFE6AE47FF258D6CC8D356BAB451DCB6EB180
```

Alternative / Jul 26 222 Guide — 2026-07-26:

```text
FF7858F5CD3F9DCB6F211EB80E6544F4E80C6E8E4DCCBD507C7ACE373D804D997CDC9311FDED301391B0AF9D2EE186B3B74DF4247EDF45DE14985B69FCBB69E4
```

### Fontes utilizadas e alcance da consulta

- [LostArk.Bible — Dimensionalist / Time Wilder class statistics](https://lostark.bible/stats/class?classId=dimension_master&classEngraving=First&arkGridCores=673001706%2C673011706%2C673021706&minIlvl=1700&maxIlvl=1810) — Statistical / Community Data. Percentuais transcritos do briefing, que relata screenshots da revisão de 17/09/2026. Conteúdo dinâmico; página indisponível nesta consulta e snapshot não revalidado independentemente.
- [Lost Ark Inven — Time 222 Post-Balance Cycle Guide](https://www.inven.co.kr/board/lostark/6543/3238) — Community Tested. Referência principal de skill setup, gems e ciclo. Página acessível; atualização de gems/runes de 01/08/2026 e lógica Combined Skills → Cross Thrust → Dimensional Break identificadas.
- [Lost Ark Inven — Time 222 Guide · Jul 26](https://www.inven.co.kr/board/lostark/6543/378) — Community Tested. Guia alternativo 222 com ciclo repetitivo e import code próprio. URL preservada do briefing; indisponível nesta consulta.
- [Lost Ark Inven — Time 222 Practical Tips](https://m.inven.co.kr/board/lostark/6543/4465) — Community Tested. Referência de prioridade prática, Cross Thrust, clock e identity. Página acessível; conteúdo adotado conforme briefing.
- [Lost Ark Inven — Time 222 Practical Cycle Tips](https://m.inven.co.kr/board/lostark/6543/4460) — Community Tested. Referência complementar de Dimensional Break/Karmic Verdict e Combined Skills. Página acessível; conteúdo adotado conforme briefing.
- [Lost Ark Inven — Adrophine / Triple Dimensional Break](https://www.inven.co.kr/board/lostark/6543/1970) — Community Tested. Referência de burst avançado, clock e Awakening/Z. URL preservada do briefing; indisponível nesta consulta.
- [Lobal — Dimensionalist Ark Grid](https://www.lobal.kr/class/dimension_master) — Database / Mechanical Reference. Referência de descrições e breakpoints dos Order Cores. Página acessível; números adotados do briefing, sem classificação Official.

A consulta confirmou acessibilidade de quatro páginas, não todos os números ou traduções Global. O guia pós-balance acessível explicita a atualização de 01/08 e a redução de cooldown por Fate. Bible e os posts 378 e 1970 retornaram erro na ferramenta de consulta; seus URLs foram preservados exatamente como fornecidos, sem afirmar que estejam quebrados ou plenamente verificados. Nenhuma fonte comunitária foi rotulada Official.

### Informações não validadas ou qualificadas

- Breakpoint absoluto de Specialization, ranking universal Relic/Ancient dos cores e melhor bracelet/valores mínimos: não estabelecidos.
- Raridades de runes: não fornecidas; não inventadas.
- Valor numérico da penalidade de dano de Dimensional Break em Twisted Timeline 14P: não fornecido; sem número inventado.
- Melhor Awakening/H.A. Skill: não estabelecida; os nomes ficam em bloco informativo. Karmic Verdict é a H.A. Technique adotada conforme briefing.
- Parse Global representativo, DPS total e distribuição por skill: ausentes. Aproximadamente 40% de Dimensional Break é observação comunitária específica, sem gráfico inventado.
- Bible popularity não significa melhor matematicamente. Tripods, runes, engravings e Chaos Cores minoritários estão identificados como alternativas.
- Triple Dimensional Break/Adrophine, clock 8–10h ou 10–11h e atraso de Awakening de aproximadamente 4s são referências práticas condicionais, não regras universais.
- Ícones de classe/skills da Dimensionalist ausentes: iniciais locais, sem downloads e sem requisições a caminhos inexistentes. Caminhos futuros documentados no README.

### Testes desta implementação

- `node --test`: 11 testes aprovados, incluindo os testes anteriores da Reaper e os novos contratos do guia.
- `node --check js/app.js`: aprovado.
- npm não disponível no PATH nem no runtime Node consultado; `npm test` não executado. O script do package.json executa o mesmo `node --test`.
- Navegador Edge via Playwright: Home com dois cards e navegação para Dimensionalist; ambos os guias em 1440, 768, 390 e 320px, sem transbordamento horizontal da página, com 8 skill cards e 11 seções cada.
- URLs locais com prefixo `/lostArk/` validadas por servidor de teste; rota desconhecida exibe retorno ao catálogo.
- Cópia real do código da Reaper e dos dois códigos da Dimensionalist comparada integralmente ao clipboard. Expanded/Compact da Reaper mantém os nove passos.
- Nenhum erro de JavaScript, console ou resposta HTTP >=400 nas páginas testadas. Nenhum texto undefined.
- Capturas em `test-results/` (ignoradas pelo Git); inspeção visual de overview desktop, cards/import, gems e identity mobile.
- Sem commit, push ou publicação remota.
- Verificação complementar: fallback de clipboard negado seleciona e foca o código alternativo correto; Home mobile sem overflow. Inspeção visual adicional de Forewarning Lv7, priority cards e comparação de presets em 390px.

## Ícones da Dimensionalist — 2026-09-17

- Oito PNGs extraídos da captura fornecida pelo usuário, associados aos nomes Global e ativados via `skills[].icon` em cards, gems e referências textuais.
- Recortes de 42 × 44 px, preservando os atalhos impressos na imagem original. Emblema da classe ainda usa fallback.
- `node --test`: 11 testes aprovados. Edge/Playwright: oito imagens carregadas com dimensões corretas, nenhum erro de JavaScript e nenhum overflow horizontal em 390px; captura mobile inspecionada.


## Runes — raridades e seletor de preset (2026-09-17)

- Revisão incremental fornecida pelo usuário substitui a ausência de raridades registrada anteriormente. Os oito cards principais e o preset Cycle-Optimized usam as raridades fornecidas; Bible Popular tem oito escolhas individuais distintas com percentuais e alternativas preservados.
- Componente genérico em js/components/runes.js: primeiro isDefault (fallback primeiro preset), botões nativos com aria-pressed e aria-controls; estado local em painéis hidden, sem reload, URL ou persistência. A troca afeta apenas Runes. Zero ou um preset não exibe seletor; markup anterior da Reaper preservado.
- Mesmo runeBadge, cores e legenda da Reaper; duas colunas desktop, seletor à direita do título e em linha própria no mobile. Percentuais/alternativas em details para legibilidade; par Conviction/Judgment somente no Bible Popular. Nenhuma divergência visual intencional do briefing.
- node --test: 14 testes aprovados. Contratos exatos das 16 runas/raridades, percentuais, default, zero/um preset, troca/restauração e imutabilidade cobertos.
- Edge/Playwright: 1600, 1280, 768, 390 e 320px. Enter/Space alternam presets, estado aria correto, oito linhas visíveis, par condicionado ao Bible, outras seções inalteradas, URL inalterada, reload retorna ao padrão. Reaper sem seletor, oito linhas e nenhum erro de console. Sem overflow horizontal.
- Inspeção visual desktop/mobile; decoração de referências exclui nomes já acompanhados de ícone na lista para evitar duplicação.
- Sem commit ou push.

## Emblema da Dimensionalist — 2026-09-17

- Adicionado SVG da coleção comunitária Inven 3905703 (entrada svg/dimension_master.svg), cujo autor relata extração oficial. Origem direta oficial não confirmada; procedência específica registrada em sources.json.
- Traçados/viewBox preservados, branco ajustado para #ede8d9 como Reaper. Home, sidebar e header utilizam o mesmo registro compartilhado.
- 14 testes aprovados; navegador confirmou carregamento na Home e nas duas posições do guia. Captura da Home inspecionada.
