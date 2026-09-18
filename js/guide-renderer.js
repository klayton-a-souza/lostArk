import { escape, badge, asset, section as baseSection, guideHeader, buildOverview, arkCoreCard, skillCard, recoveryCard, engravingList, sourceReference } from './components/ui.js';
import { combatStats, importCodes, skillSnapshot, gemsPanel, rotationPanel, damagePanel, infoPanel, arkPassivePanel } from './components/guide-panels.js';

import { runesSection } from './components/runes.js';

export const sections = [['overview', 'Overview'], ['ark-grid', 'Ark Grid'], ['stats', 'Combat Stats'], ['skills', 'Skills'], ['runes', 'Runes'], ['gems', 'Gems'], ['rotation', 'Rotation'], ['recovery', 'Recovery'], ['engravings', 'Engravings'], ['dps', 'DPS Spread'], ['sources', 'Sources']];

export const getSections = (guide) => sections.flatMap(([id, label]) => {
  const entry = [id, id === 'dps' ? (guide.damageTitle || label) : label];
  if (id === 'stats' && guide.arkPassive) return [entry, ['ark-passive', 'Ark Passive']];
  if (id === 'skills' && guide.demonSkills) return [entry, ['demon-skills', 'Demon Skills']];
  return [entry];
});

export function renderGuide(guide) {
  const navigation = getSections(guide);
  const number = (id) => String(navigation.findIndex(([key]) => key === id) + 1).padStart(2, '0');
  const section = (id, unused, ...args) => baseSection(id, number(id), ...args);
  const ark = guide.arkGrid;
  return `<div class="guide-layout"><aside class="sidebar"><a class="back-link" href="./">← Build Archive</a><div class="sidebar-guide">${asset(guide)}<div><strong>${escape(guide.class)}</strong><small>${escape(guide.variant)}</small></div></div><span class="micro nav-label">Neste guia</span><nav aria-label="Navegação do guia">${navigation.map(([id, name], i) => `<a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(name)}</a>`).join('')}</nav><div class="sidebar-bottom">${badge('POST-PATCH', 'purple')}<small>Review ${escape(guide.updated)}</small></div></aside><div class="guide-content">${guideHeader(guide)}
  ${section('overview', '01', guide.overview.title || 'Build Overview', '', buildOverview(guide) + (guide.overview.panels || []).map(infoPanel).join(''))}
  ${section('ark-grid', '02', ark.title || 'Ark Grid', 'Os cores que sustentam o ciclo.', `<h3 class="group-label order-label">☼ Order Cores</h3><div class="core-grid${ark.order.some(core => core.position !== undefined) ? ' core-grid-detailed' : ''}">${ark.order.map((core) => arkCoreCard(core, 'order', guide.sources)).join('')}</div>${(ark.panels || []).map(infoPanel).join('')}${ark.progression ? `<h3>14P vs 17P · Gameplay e poder</h3><div class="overview-grid core-progression">${ark.progression.map((item) => `<div class="summary-card"><span class="micro">${escape(item.label)}</span><strong>${escape(item.value)}</strong><p>${escape(item.text)}</p></div>`).join('')}</div>` : ''}${ark.rarityNote ? `<p class="notice">${escape(ark.rarityNote)}</p>` : ''}<aside class="minimum"><span class="micro">${escape(ark.minimumLabel || 'Minimum functional breakpoint')}</span><strong>${escape(ark.minimum)}</strong><p>${escape(ark.minimumNote)}</p></aside><div class="priority-grid">${Object.entries(ark.priorities || {}).map(([rarity, items]) => `<div class="panel"><h4>${escape(rarity)} · Order Core Priority</h4><ol class="priority-list">${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ol></div>`).join('')}</div><p class="muted">${escape(ark.priorityNote)}</p>${ark.popularityNote ? `<p class="notice">${escape(ark.popularityNote)}</p>` : ''}${ark.chaos.length ? `<h3 class="group-label chaos-label">✧ Chaos Cores</h3><div class="core-grid">${ark.chaos.map((core) => arkCoreCard(core, 'chaos', guide.sources)).join('')}</div>` : ''}`)}
  ${section('stats', '03', 'Combat Stats', '', combatStats(guide.stats))}
  ${guide.arkPassive ? section('ark-passive', '', 'Ark Passive', '', arkPassivePanel(guide.arkPassive)) : ''}
  ${section('skills', '04', 'Skill Setup', `${guide.skills.length} skills · Tripods, runas e função no ciclo.`, `${guide.skillSetupLabel ? `<h3>${escape(guide.skillSetupLabel)}</h3><p>${escape(guide.skillSetupNote)}</p>` : ''}<div class="skill-grid">${guide.skills.map(skillCard).join('')}</div>${importCodes(guide.skillImport)}${skillSnapshot(guide.skillSnapshot, guide.skills)}`)}
  ${guide.demonSkills ? section('demon-skills', '', 'Demon Form Skills', guide.demonSkillSetupNote || 'Habilidades da forma transformada e suas teclas.', `<div class="skill-grid">${guide.demonSkills.map(skillCard).join('')}</div>`) : ''}
  ${runesSection(guide, number('runes'))}
  ${section('gems', '06', 'Gems', guide.gems.description, gemsPanel(guide))}
  ${section('rotation', '07', 'Rotation', guide.rotation.description || 'Aprenda os blocos. Leia os cooldowns. Mantenha a Persona fluindo.', rotationPanel(guide))}
  ${section('recovery', '08', 'Recovery / When Rotation Breaks', 'Entenda o que está disponível e escolha a próxima ação.', `<div class="recovery-grid">${guide.recovery.map(recoveryCard).join('')}</div>`)}
  ${section('engravings', '09', 'Engravings', guide.engravingNote, engravingList(guide.engravings) + (guide.engravingAlternatives ? `<p class="notice">${escape(guide.engravingAlternatives)}</p>` : ''))}
  ${section('dps', '10', guide.damageTitle || 'DPS Spread', '', damagePanel(guide))}
  ${section('sources', '11', 'Sources / References', `Last guide review: ${guide.reviewLabel}`, `<p class="verification">${escape(guide.verification)}</p>${guide.sources.map(sourceReference).join('')}`)}
  <a class="back-top" href="#main">Voltar ao início ↑</a></div></div>`;
}
