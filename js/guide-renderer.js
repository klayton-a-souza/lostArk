import { escape, badge, asset, section, guideHeader, buildOverview, arkCoreCard, skillCard, recoveryCard, engravingList, sourceReference } from './components/ui.js';
import { combatStats, importCodes, skillSnapshot, gemsPanel, rotationPanel, damagePanel } from './components/guide-panels.js';

import { runesSection } from './components/runes.js';

export const sections = [['overview', 'Overview'], ['ark-grid', 'Ark Grid'], ['stats', 'Combat Stats'], ['skills', 'Skills'], ['runes', 'Runes'], ['gems', 'Gems'], ['rotation', 'Rotation'], ['recovery', 'Recovery'], ['engravings', 'Engravings'], ['dps', 'DPS Spread'], ['sources', 'Sources']];

export function renderGuide(guide) {
  const ark = guide.arkGrid;
  return `<div class="guide-layout"><aside class="sidebar"><a class="back-link" href="./">← Build Archive</a><div class="sidebar-guide">${asset(guide)}<div><strong>${escape(guide.class)}</strong><small>${escape(guide.variant)}</small></div></div><span class="micro nav-label">Neste guia</span><nav aria-label="Navegação do guia">${sections.map(([id, name], i) => `<a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${name}</a>`).join('')}</nav><div class="sidebar-bottom">${badge('POST-PATCH', 'purple')}<small>Review ${escape(guide.updated)}</small></div></aside><div class="guide-content">${guideHeader(guide)}
  ${section('overview', '01', 'Build Overview', '', buildOverview(guide))}
  ${section('ark-grid', '02', 'Ark Grid', 'Os cores que sustentam o ciclo.', `<h3 class="group-label order-label">☼ Order Cores</h3><div class="core-grid">${ark.order.map((core) => arkCoreCard(core, 'order', guide.sources)).join('')}</div><aside class="minimum"><span class="micro">${escape(ark.minimumLabel || 'Minimum functional breakpoint')}</span><strong>${escape(ark.minimum)}</strong><p>${escape(ark.minimumNote)}</p></aside><div class="priority-grid">${Object.entries(ark.priorities || {}).map(([rarity, items]) => `<div class="panel"><h4>${escape(rarity)} · Order Core Priority</h4><ol class="priority-list">${items.map((item) => `<li>${escape(item)}</li>`).join('')}</ol></div>`).join('')}</div><p class="muted">${escape(ark.priorityNote)}</p>${ark.popularityNote ? `<p class="notice">${escape(ark.popularityNote)}</p>` : ''}<h3 class="group-label chaos-label">✧ Chaos Cores</h3><div class="core-grid">${ark.chaos.map((core) => arkCoreCard(core, 'chaos', guide.sources)).join('')}</div>`)}
  ${section('stats', '03', 'Combat Stats', '', combatStats(guide.stats))}
  ${section('skills', '04', 'Skill Setup', `${guide.skills.length} skills · Tripods, runas e função no ciclo.`, `${guide.skillSetupLabel ? `<h3>${escape(guide.skillSetupLabel)}</h3><p>${escape(guide.skillSetupNote)}</p>` : ''}<div class="skill-grid">${guide.skills.map(skillCard).join('')}</div>${importCodes(guide.skillImport)}${skillSnapshot(guide.skillSnapshot, guide.skills)}`)}
  ${runesSection(guide)}
  ${section('gems', '06', 'Gems', guide.gems.description, gemsPanel(guide))}
  ${section('rotation', '07', 'Rotation', guide.rotation.description || 'Aprenda os blocos. Leia os cooldowns. Mantenha a Persona fluindo.', rotationPanel(guide))}
  ${section('recovery', '08', 'Recovery / When Rotation Breaks', 'Entenda o que está disponível e escolha a próxima ação.', `<div class="recovery-grid">${guide.recovery.map(recoveryCard).join('')}</div>`)}
  ${section('engravings', '09', 'Engravings', guide.engravingNote, engravingList(guide.engravings) + (guide.engravingAlternatives ? `<p class="notice">${escape(guide.engravingAlternatives)}</p>` : ''))}
  ${section('dps', '10', 'DPS Spread', '', damagePanel(guide))}
  ${section('sources', '11', 'Sources / References', `Last guide review: ${guide.reviewLabel}`, `<p class="verification">${escape(guide.verification)}</p>${guide.sources.map(sourceReference).join('')}`)}
  <a class="back-top" href="#main">Voltar ao início ↑</a></div></div>`;
}
