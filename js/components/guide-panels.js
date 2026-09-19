import { escape, badge, flow, gemTable, rotationBlock, rotationSequence } from './ui.js';

export const arkPassivePanel = (branches) => `<div class="passive-grid">${branches.map((branch) => `<article class="panel"><h3>${escape(branch.title)}</h3><dl class="passive-tiers">${branch.tiers.map(([tier, value]) => `<div><dt>${escape(tier)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>${branch.note ? `<p>${escape(branch.note)}</p>` : ''}</article>`).join('')}</div>`;

export const infoPanel = (panel) => `<article${panel.id ? ` id="${escape(panel.id)}"` : ''} class="panel detail-panel${panel.emphasis ? ' core-loop-panel' : ''}"><h3>${escape(panel.title)}</h3>${panel.shortcut ? flow(panel.shortcut, 'key-flow') : ''}${panel.flow ? flow(panel.flow) : ''}${panel.secondaryFlow ? flow(panel.secondaryFlow) : ''}${(panel.chains || []).map((chain) => `<div class="panel-chain"><h4>${escape(chain.title)}</h4>${flow(chain.flow)}</div>`).join('')}${(panel.paragraphs || []).map((text) => `<p>${escape(text)}</p>`).join('')}</article>`;
export function combatStats(stats) {
  const amount = stats.recommended ?? stats.reference;
  const numeric = typeof amount === 'number';
  return `<div class="stats-panel${numeric ? '' : ' stats-text'}"><div><span class="micro">${numeric ? (stats.reference !== undefined ? 'Reference Spec' : 'Recommended Spec') : 'Primary'}</span><strong>${numeric ? `${amount}+` : escape(stats.primary)}</strong>${numeric ? `<span>${escape(stats.primary)}</span>` : ''}${stats.secondary ? `<span>Secondary · ${escape(stats.secondary)}</span>` : ''}</div><div><h3>${escape(stats.setup)}</h3>${stats.pet ? `<p>Pet: ${escape(stats.pet)}</p>` : ''}<p class="muted">${escape(stats.note)}</p></div></div>${stats.bracelet ? infoPanel(stats.bracelet) : ''}`;
}
export function importCodes(imports) {
  if (!imports) return '';
  const presets = [imports, ...(imports.alternatives || [])];
  const label = (item, i) => item.name || (i ? 'Alternative' + (presets.length > 2 ? ' ' + i : '') : 'Main');
  const tabs = presets.length > 1 ? `<div class="import-tabs" role="tablist" aria-label="Skill presets">${presets.map((item, i) => `<button type="button" role="tab" id="import-tab-${i}" aria-controls="import-preset-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${escape(label(item, i))}</button>`).join('')}</div>` : '';
  return `<div class="panel import-panel"><h3>Skill Import Code</h3>${tabs}` + presets.map((item, i) => {
    const id = i ? `skill-code-${i}` : 'skill-code';
    const status = i ? `copy-status-${i}` : 'copy-status';
    return `<div class="import-preset" id="import-preset-${i}" ${presets.length > 1 ? `role="tabpanel" aria-labelledby="import-tab-${i}" tabindex="0"` : ''} ${i ? 'hidden' : ''}><div class="panel-heading"><div><h4>${escape(label(item, i))}</h4><p>${escape(item.note || '')}${item.updated ? ` · Updated: ${escape(item.updated)}` : ''}</p></div><button type="button" ${i ? '' : 'id="copy-code"'} data-copy-code="${id}" data-copy-status="${status}">Copiar código <span aria-hidden="true">⧉</span></button></div><code class="import-preview" aria-label="Prévia abreviada do código">${escape(item.code.slice(0, 8))}…${escape(item.code.slice(-8))}</code><details class="import-code-disclosure"><summary><span>Ver código completo</span><span class="disclosure-icon" aria-hidden="true">⌄</span></summary><code id="${id}" tabindex="0">${escape(item.code)}</code></details><span id="${status}" class="copy-status" role="status" aria-live="polite"></span></div>`;
  }).join('') + '</div>';
}
export function skillSnapshot(snapshot, skills) {
  if (!snapshot) return '';
  return `<details class="panel snapshot"><summary>${escape(snapshot.title)}</summary><p>${escape(snapshot.note)}</p><div class="skill-grid">${snapshot.entries.map((entry) => `<article class="panel"><h4>${escape(skills.find((skill) => skill.id === entry.skill).name)}</h4><p>Uso: ${escape(entry.usage)} · ${escape(entry.levels)}</p><p><strong>Tripods:</strong> ${escape(entry.tripods)}</p><p><strong>Runes:</strong> ${escape(entry.runes)}</p></article>`).join('')}</div></details>`;
}
export function gemsPanel(guide) {
  const gems = guide.gems;
  const reference = Boolean(gems.referenceLevels);
  return `<div class="gem-summary">${badge(`${gems.damage.length} Damage`, 'pink')}${badge(`${gems.cooldown.length} Cooldown`, 'purple')}${gems.filler ? badge('1 Filler') : ''}</div>${gems.referenceLabel ? `<p class="notice">${escape(gems.referenceLabel)}</p>` : ''}<h3>Damage Gems</h3>${gemTable(gems.damage, [...guide.skills, ...(guide.demonSkills || [])], gems.referenceLevels?.damage || {}, 'Damage', guide.gemTargets, reference)}<p>${escape(gems.damageNote)}</p><h3>${reference || gems.cooldownRankLabel ? 'Cooldown Gems' : 'Cooldown Gems · Upgrade Priority'}</h3>${gems.practical ? `<aside class="notice"><strong>Minimum practical</strong><p>${escape(gems.practical)}</p></aside>` : ''}${gemTable(gems.cooldown, [...guide.skills, ...(guide.demonSkills || [])], gems.referenceLevels?.cooldown || gems.recommended, 'Cooldown', guide.gemTargets, reference, gems.cooldownRankLabel)}${(gems.upgradeNotes || []).map((note) => `<p>${escape(note)}</p>`).join('')}${gems.filler ? `<div class="panel filler"><span class="gem-diamond" aria-hidden="true">◇</span><div><h3>11th Gem — Filler</h3><p>${escape(gems.filler)}</p></div></div>` : ''}`;
}
export function rotationPanel(guide) {
  const rotation = guide.rotation;
  if (rotation.type === 'sequence-cycle') return rotation.panels.map(infoPanel).join('');
  if ((rotation.type || 'block-loop') === 'priority-cycle') {
    return `<h3>Core Loop</h3>${flow(rotation.flow)}<p>${escape(rotation.note)}</p><h3>Priority System</h3><p>${escape(rotation.priorityNote)}</p><ol class="priority-cards">${rotation.priorities.map((text) => `<li class="panel">${escape(text)}</li>`).join('')}</ol>${rotation.panels.map(infoPanel).join('')}`;
  }
  const name = (id) => guide.skills.find((skill) => skill.id === id).name;
  return `<div class="rotation-grid">${rotation.blocks.map((block) => rotationBlock(block, guide)).join('')}</div><aside class="notice swoop-note"><strong>Swoop = ${escape(rotation.swoops.map(name).join(' / '))}</strong><p>${escape(rotation.note)}</p></aside>${rotationSequence(guide)}<div class="advanced"><span class="micro">Advanced Rotation Logic</span><h3>Disponibilidade antes de rigidez.</h3>${flow(rotation.advancedFlow)}<p>${escape(rotation.advanced)}</p></div>`;
}
export function damagePanel(guide) {
  const name = (id) => [...guide.skills, ...(guide.demonSkills || [])].find((skill) => skill.id === id)?.name || guide.gemTargets?.[id]?.name || id;
  if (guide.dpsSpread.length) return `<div class="panel">${guide.dpsSpread.map((entry) => `<div class="dps-row"><label>${escape(name(entry.skill))}</label><meter min="0" max="100" value="${Number(entry.percentage)}" aria-label="${escape(name(entry.skill))}"></meter><strong>${Number(entry.percentage)}%</strong></div>`).join('')}</div>`;
  const groups = guide.damagePriority || [{ label: 'Main Damage', skills: guide.skills.filter((skill) => skill.role === 'MAIN DAMAGE').map((skill) => skill.id) }, { label: 'Support / Generation', skills: guide.skills.filter((skill) => skill.role !== 'MAIN DAMAGE').map((skill) => skill.id) }];
  return `<div class="priority-grid">${groups.map((group) => `<div class="panel"><span class="micro">${escape(group.label)}</span><p>${escape(group.skills.map(name).join(' · '))}</p></div>`).join('')}</div><p class="empty-parse">${escape(guide.dpsNote)}</p>`;
}
