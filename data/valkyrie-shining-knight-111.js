// Standard supplied by the user. No rune rarities, tripod codes or gem levels were supplied.
const skill = (id, name, level, tripods, rune, role, note, gemNote) => ({ id, name, level, tripods, rune, role, note, gemNote });
const skills = [
  skill('requiem-rain', 'Requiem Rain', 14, ['Swift Fingers', 'Light of Destiny', "Archangel's Sword"], 'Judgment', 'Holy Blade / Damage / Generation', 'Uma das principais fontes secundárias de dano; alimenta o ciclo e participa do par Conviction/Judgment.', 'Damage: A · Alta / Cooldown: A · Alta'),
  skill('requiem-ash', 'Requiem Ash', 14, ['Swift Fingers', 'Divine Concentration', 'Execution'], 'Conviction', 'Holy Blade / Damage / Generation', 'Dano secundário, geração de Light Meter, Weak Point e Stagger. Conviction forma o par com Judgment de Requiem Rain.', 'Damage: A · Alta / Cooldown: A · Alta'),
  skill('whisper-of-judgment', 'Whisper of Judgment', 14, ['Pilgrim', 'Precise Sword Strike', "Storm's Protection"], 'Bleed', 'Damage / Utility', 'Dano secundário, alto Stagger, Weak Point e possibilidade de Push Immunity através da configuração correspondente.', 'Damage: B · Média / Cooldown: B · Média–alta'),
  skill('meteor-strike', 'Meteor Strike', 14, ['Swift Fingers', 'Enhanced Stab', 'Double Stab'], 'Galewind', 'Filler / Generation', 'Filler extremamente rápida. Double Stab fornece múltiplos usos/charges, valiosos para Light Meter e CPM.', 'Cooldown: C · Ciclo'),
  skill('lunging-stab', 'Lunging Stab', 10, ['Weak Point Enhancement', 'Nimble Movement', 'Focused Blow'], 'Purify', 'Mobility / Filler / Generation', 'Nimble Movement ajuda na movimentação e pode colaborar com Raid Captain.', 'Cooldown: C · Ciclo'),
  skill('crushing-condemnation', 'Crushing Condemnation', 14, ['Swift Fingers', 'Weak Point Detection', 'Storm Stampede'], 'Galewind', 'Filler / Generation', 'Opção Standard: filler rápida, boa fluidez e geração de Light Meter para manter CPM elevado.', 'Cooldown: C · Ciclo'),
  skill('sword-of-revelation', 'Sword of Revelation', 11, ['Nimble Movement', 'Holy Outburst', 'Double Cross'], 'Quick Recharge', 'Holy Blade / Counter / Generation', 'Filler e Counter importantes para a fluidez das prioridades. Nomes dos tripods Global confirmados no cliente pelo briefing.', 'Cooldown: C · Ciclo'),
  skill('foresight-slash', 'Foresight Slash', 7, ['Target Weak Point', 'Brutal Honesty'], 'Poison', 'Counter / Crit Synergy / Filler', 'Target Weak Point aplica aproximadamente +8% Crit Rate para a party por 8 segundos. Mantenha a synergy.', 'Nenhuma gem na Standard'),
];
const core = (slot, name, points) => ({ slot, position: 1, name, points });
const rarities = (relic, ancient) => [{ name: 'Relic', effect: relic }, { name: 'Ancient', effect: ancient }];
const loop = ['Shining Knight (Z)', 'Destiny / Ark Grid', 'Manter synergy', 'Justice / Holy Blade disponíveis', 'Gerar Light Meter', 'Light Meter completo', 'Final Splendor (X)', 'Repetir'];

export default {
  id: 'valkyrie-shining-knight-111', class: 'Valkyrie', build: 'Shining Knight', variant: '111 · Standard',
  role: 'DPS · Final Splendor', version: 'Final Splendor Standard Build · Post-Ark Grid',
  updated: '2026-09-19', reviewLabel: '19 de setembro de 2026 · briefing fornecido', requiresArkGrid: true,
  description: 'Fillers alimentam Final Splendor. Shining Knight 111 Standard com Trinity 3 / Last Light 2.',
  requirement: 'Order Sun 1: Final Words · Order Moon 1: Knight of Finality · Order Star 1: True End. Esta configuração é Shining Knight 111 Standard, com Trinity 3 / Last Light 2.',
  overview: {
    highlights: [{ label: 'Build', value: 'Shining Knight 111' }, { label: 'Main Damage', value: 'Final Splendor (X)' }, { label: 'Enlightenment', value: 'Trinity 3 / Last Light 2' }, { label: 'Gems', value: '4 Damage + 7 Cooldown = 11' }],
    playstyle: 'Fillers alimentam Final Splendor. Use rapidamente Justice/Holy Blade skills para gerar Light Meter, completar a barra e utilizar Final Splendor. As skills normais causam dano e aceleram o próximo Final Splendor. Busque frequência, acertos consistentes, aproveitamento de buffs, uptime e geração eficiente.',
    flow: loop,
    panels: [
      { title: 'Como funciona Shining Knight', paragraphs: ['Shining Knight substitui a gameplay convencional de Piety Meter por Light Meter. Justice e Holy Blade contribuem para sua geração; normalmente são necessários 15 usos de skills para completar o processo.', 'Uma filler pode gerar Light Meter mesmo sem acertar o boss. Não segure excessivamente fillers esperando dano perfeito se isso atrasar significativamente o próximo Final Splendor.', 'Na 111, otimizar o número de Final Splendors é mais importante do que tentar maximizar individualmente cada filler. Final Splendor precisa acertar o boss.'] },
      { title: 'Z — Shining Knight', paragraphs: ['Ativa a identidade, concede os benefícios de Light Sword usados pelas Holy Blade skills, Push Immunity e reset do Movement Skill.', 'Sua interação com Knight of Finality ativa Destiny e prepara o ciclo de Final Splendor. É uma parte estrutural do Ark Grid 111.'] },
      { title: 'X — Final Splendor', emphasis: true, paragraphs: ['Final Splendor é o centro da Shining Knight 111. Principal fonte de dano e principal Damage Gem; proteja sua execução para acertá-lo consistentemente.', 'Recebe benefícios diretos de Last Light, Holy Sword Unleashed e dos três cores 1 do Ark Grid.', 'Utilidade: Weak Point Lv.2 · Stagger High · Push Immunity. No servidor Global, Final Splendor é X; Shining Knight é Z.'] },
    ],
  },
  arkGrid: {
    title: 'Ark Grid · 111', order: [
      core('Sun', 'Final Words', [
        { value: 10, text: 'Final Splendor Damage +4%.' },
        { value: 14, text: 'Quando Destiny é ativado, recupera Light Meter equivalente a 1 uso de Justice/Holy Blade skill.', note: 'O ciclo normalmente exige 15 usos. Esta geração adicional reduz o esforço no ciclo correspondente; não é uma redução permanente de toda barra para 14 skills.' },
        { value: 17, text: 'O próximo Final Splendor recebe dano adicional.', rarities: rarities('+7%', '+10%') },
        { value: '18–20', text: '+0.25% Final Splendor Damage adicional por ponto.' },
      ]),
      core('Moon', 'Knight of Finality', [
        { value: 10, text: 'Final Splendor Damage +4%.' },
        { value: 14, text: 'Usar Shining Knight ativa Destiny.' },
        { value: 17, text: 'Final Splendor Damage adicional.', rarities: rarities('+8%', '+10%') },
        { value: '18–20', text: '+0.25% Final Splendor Damage por ponto.' },
      ]),
      core('Star', 'True End', [
        { value: 10, text: 'Final Splendor Casting Speed +20%.' },
        { value: 14, text: 'Final Splendor Damage +3%.' },
        { value: 17, text: 'Critical Final Splendor recebe Damage to Foes adicional.', rarities: rarities('+5.5%', '+7%') },
        { value: '18–20', text: '+0.25% adicional por ponto no efeito relacionado ao Critical Final Splendor.' },
      ]),
    ], chaos: [], minimumLabel: 'Interação de Destiny · 14P', minimum: 'Final Words + Knight of Finality',
    minimumNote: 'Shining Knight ativa Destiny através de Knight of Finality; Final Words reage com geração adicional. Os efeitos ofensivos de 17P fortalecem Final Splendor.',
    panels: [{ title: 'Os três cores 1 trabalham juntos', flow: ['Shining Knight', 'Knight of Finality', 'Destiny', 'Final Words', 'Light Meter adicional + buff', 'True End', 'Final Splendor mais rápido e mais forte'], paragraphs: ['A interação com Destiny alimenta o ciclo e fortalece o próximo Final Splendor. True End acrescenta velocidade e dano, recompensando o Critical Hit. Essa combinação especializa a 111 em Final Splendor.'] }],
  },
  stats: { primary: '~100% Crit efetivo', secondary: 'Swiftness', setup: 'Holy Sword Unleashed III', note: 'Por 1% Crit Rate: aproximadamente +0.55% Damage to Foes e +1.5% Final Splendor Damage, até o equivalente a 100% Crit. No teto: +55% Damage to Foes e +150% Final Splendor Damage.',
    bracelet: { title: 'Crit Synergy conta para o alvo', paragraphs: ['Exemplos conceituais: ~100% self Crit em party sem Crit synergy; ~90% self Crit com aproximadamente +10% Crit synergy da party.', '98–99% ou 101–102% podem estar suficientemente próximos dependendo da configuração. Não sacrifique cooldown/dano excessivos para atingir exatamente 100.00%.', 'Bracelet, acessórios, refinements, Adrenaline, outras fontes e party synergy alteram a quantidade necessária nos nodes.'] } },
  arkPassive: [
    { title: 'Enlightenment · Standard', tiers: [['Rank III', 'Shining Knight III'], ['Rank III', 'Sword Training III'], ['Rank III', 'Holy Sword Unleashed III'], ['Rank III · Recommended', 'Trinity III · Damage to Foes +14%'], ['Rank II · Recommended', 'Last Light II · próximo Final Splendor Damage +6%']], note: 'Trinity 3 aumenta dano geral, beneficiando Requiem Rain, Requiem Ash, Whisper of Judgment, Cataclysm e outras fontes. Usar Shining Knight concede Last Light, que fortalece o próximo Final Splendor, e fornece os efeitos de Light Sword usados pelas Holy Blade skills.' },
    { title: 'Evolution · Crit suficiente', tiers: [['Tier 1', 'Crit 30 / Swiftness 10'], ['Tier 2', 'Boundless MP 2 / Limit Break 1'], ['Tier 3', 'Unlimited Magick 2'], ['Tier 4', 'Critical 1 / Pulverize 1'], ['Tier 5', 'Standing Striker 2']], note: 'Preset principal quando as demais fontes já fornecem Crit suficiente. Preserva Critical Rate, cooldown reduction, Evolution Damage, frequência de skills e CPM de Final Splendor.' },
    { title: 'Evolution · Recuperar Crit', tiers: [['Tier 1', 'Crit 30 / Swiftness 10'], ['Tier 2', 'Keen Sense 2 / Limit Break 1'], ['Tier 3', 'Unlimited Magick 2'], ['Tier 4', 'Critical 1 / Master 1'], ['Tier 5', 'Standing Striker 2']], note: 'Keen Sense 2 fornece Crit adicional; Master acrescenta Crit ao acumular stacks. Sacrifica parte de outras opções para recuperar Crit quando necessário.' },
  ],
  arkPassivePanels: [
    { title: 'Prioridade de ajuste', emphasis: true, flow: ['1 · Próximo de 100% Crit efetivo', '2 · Preservar Unlimited Magick 2', '3 · Maximizar cooldown/dano'], paragraphs: ['Não copie Evolution cegamente: ajuste os nodes às fontes de Crit do personagem e à party.'] },
    { title: 'Por que Trinity 3 / Last Light 2?', paragraphs: ['A Standard mantém mais dano geral e ainda fortalece Final Splendor. Trinity 2 / Last Light 5 concentra mais dano em Final Splendor, reduz dano geral e pertence a uma variação mais extrema. Essa alternativa não é a configuração principal nem um preset implementado neste guia.'] },
  ],
  skills, skillSetupLabel: 'Main / Standard · 8 skills', skillSetupNote: 'Crushing Condemnation integra a Standard. As prioridades de gemas abaixo indicam investimento, sem níveis fixos.',
  skillBar: true,
  runePresets: [{ id: 'standard', name: 'Standard', isDefault: true, note: 'Runas da Standard. Raridades não especificadas no briefing.', assignments: skills.map(({ id, rune }) => ({ skill: id, rune })), pairNote: 'Conviction: Requiem Ash → Judgment: Requiem Rain. Este é o par da configuração Standard.' }],
  gemTargets: { 'final-splendor': { name: 'Final Splendor', role: 'MAIN DAMAGE' } },
  gems: {
    description: '4 Damage Gems + 7 Cooldown Gems = 11. Foresight Slash não recebe gem.',
    damage: ['final-splendor', 'requiem-rain', 'requiem-ash', 'whisper-of-judgment'],
    cooldown: skills.filter(({ id }) => id !== 'foresight-slash').map(({ id }) => id),
    damageRanks: { 'final-splendor': 'S', 'requiem-rain': 'A', 'requiem-ash': 'A', 'whisper-of-judgment': 'B' },
    cooldownRanks: { 'requiem-rain': 'A', 'requiem-ash': 'A', 'whisper-of-judgment': 'B', 'meteor-strike': 'C', 'lunging-stab': 'C', 'crushing-condemnation': 'C', 'sword-of-revelation': 'C' },
    damagePriorities: { 'final-splendor': 'Máxima', 'requiem-rain': 'Alta', 'requiem-ash': 'Alta', 'whisper-of-judgment': 'Média' },
    recommended: { 'requiem-rain': 'Alta', 'requiem-ash': 'Alta', 'whisper-of-judgment': 'Média–alta', 'meteor-strike': 'Ciclo', 'lunging-stab': 'Ciclo', 'crushing-condemnation': 'Ciclo', 'sword-of-revelation': 'Ciclo' },
    damageNote: 'S · Final Splendor é o principal investimento da build, acima das demais Damage Gems.',
    emphasis: { title: 'S · Final Splendor · Damage Gem', emphasis: true, paragraphs: ['Prioridade máxima. O ciclo inteiro alimenta sua principal fonte de dano.'] },
    upgradeNotes: ['C não significa gem ruim. Nas fillers: menor cooldown → mais usos → mais Light Meter → mais Final Splendors. Essas Cooldown Gems são fundamentais para a build.', 'Total: 11 gems. Foresight Slash permanece sem Damage Gem e sem Cooldown Gem.'],
  },
  rotationTitle: 'Gameplay Priorities',
  rotation: { type: 'priority-cycle', description: 'Sistema de prioridades: responda aos cooldowns e às oportunidades do boss.', flow: loop,
    note: 'Fillers podem gerar meter mesmo quando erram. Final Splendor precisa conectar. A ordem das Justice/Holy Blade disponíveis depende da situação.',
    priorityNote: 'Uma filler usada no vazio ainda pode contribuir para Light Meter. Errar Final Splendor perde uma parte extremamente importante do dano.',
    priorities: ['Não perder bons Final Splendors.', 'Manter a synergy.', 'Manter as skills girando.', 'Minimizar tempo sem utilizar skills.', 'Gerar Light Meter o mais rapidamente possível.', 'Utilizar Final Splendor em boas oportunidades.', 'Aproveitar buff windows quando isso não causar perda excessiva de casts.'],
    panels: [{ title: 'Final Splendor CPM', paragraphs: ['CPM mede Final Splendors por minuto e ajuda a analisar gameplay.', 'CPM baixo: pode indicar gaps excessivos, fillers sendo seguradas ou cooldowns mal utilizados.', 'CPM alto + muitos Final Splendors errados: geração boa, execução do burst ruim.', 'CPM alto + Final Splendors acertando: cenário desejado.', 'Não existe meta rígida universal: boss downtime, mecânicas e padrões alteram o CPM. Compare o contexto, não apenas o número.'] }],
  },
  recovery: [
    { title: 'Gaps de geração', action: 'Mantenha Justice/Holy Blade disponíveis em uso. Fillers no vazio podem alimentar Light Meter; evite segurá-las excessivamente.' },
    { title: 'Barra completa, boss indisponível', action: 'Proteja o acerto de Final Splendor e utilize uma boa oportunidade. Considere downtime e mecânicas ao avaliar CPM.' },
  ],
  engravingGroups: [{ title: 'Core', items: ['Grudge', 'Adrenaline', 'Keen Blunt Weapon', 'Raid Captain'] }, { title: 'Standard fifth', items: ['Cursed Doll'] }, { title: 'Alternatives · Livros / investimento', items: ['Stabilized Status', 'Mass Increase', 'Hit Master'] }],
  engravings: ['Grudge', 'Adrenaline', 'Keen Blunt Weapon', 'Raid Captain', 'Cursed Doll'],
  engravingNote: 'Cursed Doll é a quinta engraving Standard.', engravingAlternatives: 'As alternativas dependem dos livros e do investimento; não são necessariamente equivalentes à escolha Standard.',
  utility: [
    { title: 'Counter / Synergy', paragraphs: ['Foresight Slash: Counter + Crit synergy (~8% por 8 segundos).', 'Sword of Revelation: Counter.'] },
    { title: 'Stagger / Weak Point / Proteção', paragraphs: ['Whisper of Judgment: alto Stagger, Weak Point e possibilidade de Push Immunity.', 'Requiem Ash: Weak Point e Stagger.', 'Final Splendor: Weak Point Lv.2, Stagger High e Push Immunity.', 'Shining Knight: Push Immunity e reset do Movement Skill.'] },
    { title: 'Awakening / Hyper Awakening / T-Skill', paragraphs: ["Awakening: Brundia's Epiphany", "Hyper Awakening: Brundia's Incarnation", 'Hyper Awakening Technique / T-Skill: Cataclysm. Estas habilidades não compõem uma rotação obrigatória.'] },
    { title: 'Standard e variações', paragraphs: ['A 111 possui variações avançadas de skills e Enlightenment. Este guia implementa apenas Shining Knight 111 Standard — Trinity 3 / Last Light 2.', 'Approach of Revelation, Judgment Stigmata e outras distribuições de Enlightenment ficam para uma documentação futura.'] },
  ],
  damageTitle: 'Damage Priority', dpsSpread: [],
  damagePriority: [{ label: 'Principal', skills: ['final-splendor'] }, { label: 'Dano secundário', skills: ['requiem-rain', 'requiem-ash', 'whisper-of-judgment'] }],
  dpsNote: 'Prioridade qualitativa: nenhuma distribuição percentual de DPS foi fornecida.', sources: [],
  verification: 'Conteúdo preservado do briefing validado e fornecido pelo usuário. Nomes Global, Standard 111 e Trinity 3 / Last Light 2. Data de revisão editorial; sem alegação de revalidação independente ou fontes externas não fornecidas.',
};
