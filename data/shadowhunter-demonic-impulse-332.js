// Conteúdo editorial fornecido pelo usuário. Sem estatísticas ou efeitos adicionais inferidos.
const skillIcon = (id) => id === 'blood-demonic-clone' ? undefined : `assets/images/skills/shadowhunter/${id}.png`;
const human = (id, name, level, tripods, code, extra = {}) => ({ id, name, level, tripods, code, role: 'Human Form', icon: skillIcon(id), ...extra });
const demon = (id, name, key, rune, rarity, note = '') => ({ id, name, key, tripods: [], role: 'Demon Form', rune, rarity, note, icon: skillIcon(id) });
const skills = [
  human('demonic-slash', 'Demonic Slash', 10, ['Damage Amplification', 'Nimble Movement', 'Ambush Charge'], '132'),
  human('spinning-dive', 'Spinning Dive', 10, ['Excellent Mobility', 'Tenacity', 'Spinning Master'], '212'),
  human('rising-claw', 'Rising Claw', 10, ['Naively Honest', 'Concussion', 'Grasp of Death'], '232'),
  human('demonic-clone', 'Demonic Clone', 10, ['Tenacity', 'Fist of Destruction', 'Enhanced Release Encroachment'], '331'),
  human('demon-vision', 'Demon Vision', 14, ['Quick Release', 'Encroaching Power', 'Instant Discharge'], '131', { rune: 'Wealth', rarity: 'Legendary' }),
  human('decimate', 'Decimate', 14, ['Swift Fingers', 'Weak Point Detection', 'Cruel Hand'], '211'),
  human('demons-grip', "Demon's Grip", 14, ['Swift Fingers', 'Encroaching Power', 'Stretching Hand'], '322'),
  human('howl', 'Howl', 14, ['Damage Amplification', 'Encroaching Power', 'Mighty Roar'], '322'),
];
const demonSkills = [
  demon('ruining-rush', 'Ruining Rush', 'Q'),
  demon('death-claw', 'Death Claw', 'W', 'Quick Recharge', 'Legendary'),
  demon('destruction', 'Destruction', 'E', 'Rage', 'Legendary'),
  demon('gore-bleeding', 'Gore Bleeding', 'R', 'Galewind', 'Legendary'),
  demon('leaping-blow', 'Leaping Blow', 'A', 'Galewind', 'Epic'),
  demon('blood-massacre', 'Blood Massacre', 'S', 'Vision', 'Legendary'),
  demon('blood-vortex', 'Blood Vortex', 'D', 'Galewind', 'Legendary'),
  demon('bloody-piercing', 'Bloody Piercing', 'F', 'Galewind', 'Epic'),
  { ...demon('blood-demonic-clone', 'Blood Demonic Clone', 'X', undefined, undefined, 'Sem runa.'), role: 'MAIN DAMAGE' },
  demon('blood-marsh', 'Blood Marsh', 'T', undefined, undefined, 'Hyper Awakening Technique'),
  demon('fallen-ruin', 'Fallen Ruin', 'V', undefined, undefined, 'Awakening'),
];
const coreLoop = ['Blood Vortex', 'Bloody Piercing', 'Blood Demonic Clone', 'Leaping Blow', 'Blood Demonic Clone'];
const keys = ['D', 'F', 'X', 'A', 'X'];
export default {
  id: 'shadowhunter-demonic-impulse-332', class: 'Shadowhunter', build: 'Demonic Impulse', variant: 'Ominous 332',
  role: 'DPS', version: 'Post-Patch Ark Grid Build', updated: '2026-09-17', reviewLabel: 'September 17, 2026', requiresArkGrid: true,
  description: 'Gere Shadowburst Meter, transforme e execute D → F → X → A → X.',
  requirement: 'Demonic Impulse — Ominous 332 é uma configuração pós-Ark Grid. Ominous, Demonic Clone e Critical Claws sustentam o ciclo de burst e retorno à Human Form.',
  overview: {
    title: 'Quick Summary / Identity',
    highlights: [
      { label: 'Build', value: 'Demonic Impulse' }, { label: 'Ark Grid', value: 'Ominous 332 · Sun 3 / Moon 3 / Star 2' },
      { label: 'Stats', value: 'Specialization · referência 1777+' }, { label: 'Main Damage', value: 'Blood Demonic Clone' },
      { label: 'Human Meter', value: "Demon's Grip → Demon Vision → Demonize" }, { label: 'Main Rotation', value: 'D → F → X → A → X' },
      { label: 'Cores', value: 'Ominous · Demonic Clone · Critical Claws' },
      { label: 'Engravings', value: 'Grudge · Adrenaline · Keen Blunt Weapon · Raid Captain · Cursed Doll' },
    ],
    playstyle: 'Gere Shadowburst Meter rapidamente em Human Form, use Demonize e execute o burst. Gaste o Demon Meter com os dois Blood Demonic Clone, retorne à Human Form, gere meter novamente e repita. A identidade da 332 é esse ciclo curto de geração e burst.',
    flow: ['Human Form / Meter', 'Demonize', 'D → F → X → A → X', 'Gastar Demon Meter', 'Human Form', 'Repetir'],
    panels: [{ title: 'CORE LOOP', shortcut: keys, flow: coreLoop, emphasis: true, paragraphs: ['D = Blood Vortex · F = Bloody Piercing · X = Blood Demonic Clone · A = Leaping Blow.'] }],
  },
  stats: { primary: 'Specialization', reference: 1777, setup: 'Specialization principal · referência 1777+', note: "Com Specialization suficiente e acertos corretos, Demon's Grip + Demon Vision devem gerar o Shadowburst Meter necessário para transformar. 1777+ é o breakpoint de referência; use Grip antes de Vision. Crit / Swiftness são ajustados conforme a conta." },
  arkGrid: {
    title: 'Ark Grid — Ominous 332', minimumLabel: 'Configuração 332', minimum: 'Sun 3 · Moon 3 · Star 2',
    minimumNote: 'Com os Cores nos breakpoints necessários de 14P, a estrutura fundamental da 332 já funciona em Legendary. Demonic Clone 14P e Ominous 14P habilitam a mecânica; Critical Claws 14P fortalece Blood Vortex. Relic/Ancient aumentam significativamente o dano e a eficiência.',
    order: [
      {
        slot: 'Sun', position: 3, name: 'Ominous',
        description: 'Permite que Leaping Blow [A] gere o segundo Blood Demonic Clone [X] do ciclo.',
        points: [
          { value: 10, text: 'Demon Skill Damage +1.8%. Bônus inicial do Core.' },
          { value: 14, label: 'Gameplay Breakpoint', tone: 'purple', text: 'Demon Skill Damage −30%. Ao ativar Destiny: reduz em 8 segundos o cooldown das Encroachment Skills e concede Destiny: Ominous.', note: 'Enquanto Destiny: Ominous estiver ativo, Leaping Blow [A] concede imediatamente Frenzied Chaos. O −30% faz parte dessa mudança estrutural: é o conjunto de efeitos que habilita o segundo X do DFXAX.', flow: ['Leaping Blow [A]', 'Frenzied Chaos', 'Blood Demonic Clone [X]'] },
          { value: 17, label: 'Major Power Spike', tone: 'pink', text: 'Enquanto Demonized, aumenta Outgoing Damage:', rarities: [{ name: 'Relic', effect: '+5%' }, { name: 'Ancient', effect: '+6%' }] },
          { value: '18–20', label: 'Scaling', text: '18P: Demon Skill Damage +0.2%. 19P: +0.2%. 20P: +0.2%. Cada breakpoint acrescenta dano, sem alterar o loop.' },
        ],
      },
      {
        slot: 'Moon', position: 3, name: 'Demonic Clone',
        description: 'Ativa Destiny através de Demonize e fortalece Blood Demonic Clone [X], usado duas vezes no DFXAX.',
        points: [
          { value: 10, text: 'Damage to foes +1.5%.' },
          { value: 14, label: 'Gameplay Breakpoint', tone: 'purple', text: 'Ao usar Demonize, Destiny é ativado. Demonic Clone 14P trabalha junto com Ominous 14P: Destiny ativa a mecânica de Ominous.', flow: ['Demonize', 'Destiny', 'Destiny: Ominous', 'Leaping Blow [A]', 'Frenzied Chaos', 'Blood Demonic Clone [X]'] },
          { value: 17, label: 'Major Power Spike', tone: 'pink', text: 'Blood Demonic Clone [X] Damage:', rarities: [{ name: 'Relic', effect: '+18%' }, { name: 'Ancient', effect: '+20%' }], note: 'Blood Demonic Clone [X] Casting Speed +20% em ambas as raridades.' },
          { value: '18–20', label: 'Scaling', text: '18P: Demon Skill Damage +0.2%. 19P: +0.2%. 20P: +0.2%. Cada breakpoint acrescenta dano, sem alterar o loop.' },
        ],
      },
      {
        slot: 'Star', position: 2, name: 'Critical Claws',
        description: 'Fortalece skills demoníacas importantes, principalmente Blood Vortex [D] e Blood Demonic Clone [X].',
        points: [
          { value: 10, text: 'Gore Bleeding: Cooldown −3 segundos e Casting Speed +20%.' },
          { value: 14, label: 'Gameplay / Damage Breakpoint', tone: 'purple', text: 'Blood Vortex [D] Damage +10%. Fortalece o D que abre D → F → X → A → X.', note: 'Aqui o ganho é de dano; a interação que habilita o segundo X vem de Demonic Clone 14P + Ominous 14P.' },
          { value: 17, label: 'Major Power Spike', tone: 'pink', text: 'Blood Demonic Clone [X] Damage:', rarities: [{ name: 'Relic', effect: '+9%' }, { name: 'Ancient', effect: '+14%' }], note: 'Fortalece o X da rotação principal.' },
          { value: '18–20', label: 'Scaling', text: '18P: Demon Skill Damage +0.2%. 19P: +0.2%. 20P: +0.2%. Cada breakpoint acrescenta dano, sem alterar o loop.' },
        ],
      },
    ],
    panels: [{
      title: 'Why 332 Works', shortcut: keys,
      chains: [
        { title: 'Preparação · Demonic Clone 14P + Ominous 14P', flow: ['Demonize', 'Destiny', 'Destiny: Ominous'] },
        { title: 'Primeiro X · converter Chaos Slivers', flow: ['Blood Vortex [D] + Bloody Piercing [F]', 'Chaos Sliver ×2', 'Frenzied Chaos', 'Blood Demonic Clone [X]'] },
        { title: 'Segundo X · aproveitar Destiny: Ominous', flow: ['Leaping Blow [A]', 'Frenzied Chaos', 'Blood Demonic Clone [X]'] },
        { title: 'Resultado · Core Loop', flow: coreLoop },
      ],
      paragraphs: ['Demonic Clone 14P faz Demonize ativar Destiny; Ominous 14P usa essa ativação para conceder Destiny: Ominous. D + F fornecem Chaos Sliver ×2, que prepara Frenzied Chaos para o primeiro X. Com Destiny: Ominous ativo, A prepara Frenzied Chaos imediatamente para o segundo X.', 'Critical Claws fortalece D no 14P e X no 17P. Assim, os Cores conectam a ativação da mecânica, a repetição de X e o dano do mesmo DFXAX.'],
    }],
    progression: [
      { label: '14P · Gameplay', value: 'Faz a build funcionar', text: 'Demonic Clone + Ominous habilitam a estrutura DFXAX; Critical Claws aumenta o dano de Blood Vortex.' },
      { label: '17P · Power Spike', value: 'Faz a build escalar fortemente', text: 'Demonic Clone melhora dano e Casting Speed de X; Ominous aumenta dano durante Demonize; Critical Claws aumenta ainda mais X.' },
      { label: '18–20P · Scaling', value: 'Dano adicional, mesmo loop', text: 'Demon Skill Damage +0.2% em cada breakpoint. Nenhuma mudança na lógica da rotação.' },
    ],
    rarityNote: 'Relic e Ancient usam a mesma Ominous 332. Ancient aumenta determinados valores do 17P, sem criar uma rotação diferente. Os valores de ambas as raridades estão indicados em cada Core.',
    priorities: { Relic: ['Demonic Clone', 'Critical Claws', 'Ominous'], Ancient: ['Critical Claws', 'Demonic Clone', 'Ominous'] },
    priorityNote: 'Prioridade dos Cores para o guia Global. Preserve os breakpoints necessários antes de priorizar upgrades de raridade. Demonic Clone tem alta prioridade em Relic porque melhora diretamente o dano de Blood Demonic Clone e sua velocidade de execução. Critical Claws ganha grande valor em Ancient: seu bônus de X no 17P sobe de +9% para +14%. Ominous continua fundamental através do 14P, mesmo não sendo o primeiro upgrade de raridade.', chaos: [],
  },
  arkPassive: [
    { title: 'Evolution', tiers: [
      ['Tier 1', 'Specialization 30 · Crit / Swiftness conforme a conta'], ['Tier 2', 'Limit Break 3'], ['Tier 3', 'Zealous Smite 2'],
      ['Tier 4', 'Critical 1 · Pulverize 1'], ['Tier 5', 'Standing Striker 2'],
    ], note: 'A referência trabalha com aproximadamente 90–98% Crit Rate total, não um requisito absoluto. Ajuste Crit / Swiftness considerando Adrenaline, party synergy, bracelet, acessórios e outras fontes de Crit.' },
    { title: 'Enlightenment', tiers: [['Tier 1', 'Demonic Impulse 1'], ['Tier 2', 'Instinct Enhancement 3'], ['Tier 3', 'Chaos Enhancement 3'], ['Tier 4', 'Execution Ceremony 3 · Corrosion 2']] },
    { title: 'Leap', tiers: [['Tier 1', 'Unleashed Power 5 · Release Potential 5'], ['Tier 2', "Demon's Ascension 3"]] },
  ],
  skills, demonSkills,
  runeNote: 'Somente as runas fixas desta configuração. Blood Demonic Clone não utiliza runa.',
  demonSkillSetupNote: 'Teclas da configuração 332 · Blood Marsh (T) e Fallen Ruin (V) incluídos.',
  skillSetupLabel: 'Human Form · 8 skills', skillSetupNote: 'Spinning Dive integra o setup principal. A fase humana prioriza geração rápida de meter. Runas aparecem somente onde foram especificadas.',
  gems: {
    description: '5 Damage Gems + 6 Cooldown Gems.', cooldownRankLabel: 'Slot',
    damage: ['blood-demonic-clone', 'blood-vortex', 'bloody-piercing', 'gore-bleeding', 'blood-massacre'],
    cooldown: ['blood-vortex', 'bloody-piercing', 'gore-bleeding', 'leaping-blow', 'blood-massacre', 'demon-vision'],
    damageNote: 'Prioridade de upgrade: 1. Blood Demonic Clone; 2. Blood Vortex; 3. Bloody Piercing. Depois: Gore Bleeding e Blood Massacre.',
    recommended: { 'blood-vortex': 'Prioridade alta', 'bloody-piercing': 'Prioridade alta' },
    upgradeNotes: ['Blood Vortex e Bloody Piercing têm alta prioridade de cooldown: afetam diretamente a disponibilidade do próximo ciclo principal. A ordem dos demais slots não define uma prioridade adicional.'],
  },
  rotation: {
    type: 'sequence-cycle', description: 'Geração curta em Human Form → burst em Demon Form → repetir.',
    panels: [
      { id: 'meter-generation', title: 'Human Form / Meter Generation', shortcut: ['Grip', 'Vision', 'Z'], flow: ["Demon's Grip", 'Demon Vision', 'Demonize'], paragraphs: ["Objetivo: sair da Human Form o mais rápido possível. Use Demon's Grip antes de Demon Vision.", 'Referência: 1777+ Specialization. Com Specialization suficiente, as duas skills devem completar Shadowburst Meter, desde que acertem corretamente.'] },
      { id: 'core-loop', title: 'CORE LOOP', shortcut: keys, flow: coreLoop, emphasis: true, paragraphs: ['Blood Vortex + Bloody Piercing geram Frenzied Chaos, preparando o primeiro Blood Demonic Clone. Esse X consome parte do Demon Meter.', 'Leaping Blow, com Ominous, prepara imediatamente outro Blood Demonic Clone. O segundo X consome o restante do meter e encerra Demonize.', 'Retorne à Human Form, gere meter e transforme novamente.'] },
      { id: 'standard-loop', title: 'Standard Loop', shortcut: ['Grip', 'Vision', 'Z', ...keys], flow: ["Demon's Grip", 'Demon Vision', 'Demonize', ...coreLoop, 'Human Form', 'Repetir'] },
      { id: 'opener', title: 'Opener / Burst', flow: ['Demonic Clone', 'Decimate', 'Howl', 'Demonize'], shortcut: ['D', 'F', 'X', 'T', 'A', 'X'], secondaryFlow: ['Blood Vortex', 'Bloody Piercing', 'Blood Demonic Clone', 'Blood Marsh', 'Leaping Blow', 'Blood Demonic Clone'], paragraphs: ['O opener pode preparar Adrenaline e esperar buffs de suporte antes de transformar.', 'T = Blood Marsh / Hyper Awakening Technique. Preserve D → F → X → A → X: não encaixe T se isso atrasar o funcionamento principal do loop.'] },
      { id: 'fillers', title: 'Filler Priority', paragraphs: ['DFXAX > Fillers', 'Você pode entrar novamente em Demonize antes de Blood Vortex / Bloody Piercing estarem disponíveis. Enquanto D/F estão em cooldown, use Gore Bleeding, Death Claw, Destruction, Blood Massacre e Ruining Rush disponíveis.', 'Referência aproximada, sem rotação rígida: Gore Bleeding ×2 · Death Claw ×2 · Destruction ×1 · Blood Massacre ×1 · Ruining Rush ×1. A quantidade real depende de cooldown, gems e duração da janela.', 'Assim que Blood Vortex e Bloody Piercing estiverem disponíveis, volte imediatamente ao DFXAX.'], emphasis: true },
      { id: 'awakening', title: 'Awakening / Hyper Awakening', flow: ['Core Loop', 'Awakening / Hyper Awakening', 'Fillers'], paragraphs: ['Prioridade: Core Loop > Awakening / Hyper Awakening > fillers.', 'T — Blood Marsh: Hyper Awakening Technique. V — Fallen Ruin: Awakening. Esses ataques não devem atrasar DFXAX.', 'Blood Marsh pode entrar no opener: D → F → X → T → A → X.'] },
      { id: 'party-synergy', title: 'Party Synergy', paragraphs: ['Damage Amplification: +6% damage dealt to the affected enemy/target.', 'Mantenha a synergy ativa durante o burst 332. Demonic Slash e Howl possuem Damage Amplification no setup humano; Destruction pode manter a synergy em Demon Form.'] },
    ],
  },
  recovery: [{ title: 'Erro: D → F → A → X', action: 'Essa ordem pode quebrar a sequência de Blood Demonic Clone / redução de cooldown. Na próxima transformação: A → X → sair da Demon Form.', note: 'Depois: gerar meter novamente → Demonize → D → F → X → A → X. Retome o loop padrão.' }],
  engravings: ['Grudge', 'Adrenaline', 'Keen Blunt Weapon', 'Raid Captain', 'Cursed Doll'], engravingNote: 'Configuração principal · Demonic Impulse — Ominous 332.',
  damageTitle: 'Damage Priority', dpsSpread: [], dpsNote: 'Prioridade de dano; sem estimativa de DPS absoluto ou percentuais dependentes de gear.',
  damagePriority: [
    { label: '1 / Main Damage', skills: ['blood-demonic-clone'] }, { label: '2 / Burst', skills: ['blood-vortex', 'bloody-piercing'] },
    { label: '3 / Damage', skills: ['gore-bleeding', 'blood-massacre'] }, { label: '4 / Outras Demon Skills / Fillers', skills: ['death-claw', 'destruction', 'ruining-rush'] },
  ],
  sources: [], verification: 'Conteúdo implementado conforme o briefing fornecido para Demonic Impulse — Ominous 332. Sem revalidação independente das mecânicas nesta entrega. Rising Claw usa Naively Honest, uma das nomenclaturas fornecidas. 18 ícones de skills extraídos das capturas fornecidas; Blood Demonic Clone (X) ainda usa fallback. O emblema da classe e os ícones de categoria Ark Grid são compartilhados com o catálogo existente.',
};
