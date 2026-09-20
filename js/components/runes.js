import { escape, asset, runeBadge, section } from './ui.js';
import { infoPanel } from './guide-panels.js';

export const defaultRunePreset = (guide) => guide.runePresets?.find((preset) => preset.isDefault) || guide.runePresets?.[0];
const legend = () => `<div class="rune-legend">${['Legendary', 'Epic', 'Rare', 'Uncommon'].map((rarity) => runeBadge('Rune', rarity)).join('')}</div>`;

export function runePresetControls(guide, prefix = 'rune') {
  const presets = guide.runePresets || [];
  if (presets.length < 2) return '';
  const active = defaultRunePreset(guide);
  return `<div class="rune-preset-controls" role="group" aria-label="${prefix === 'skill' ? 'Preset de skills e runas' : 'Preset de runas'}">${presets.map((preset, i) => `<button type="button" data-rune-preset="${escape(preset.id)}" aria-pressed="${preset === active}" aria-controls="${prefix}-preset-${i}">${escape(preset.name)}</button>`).join('')}</div>`;
}

function presetPanel(preset, guide) {
  return `<p class="section-description">${escape(preset.shortDescription || preset.note)}</p>${preset.assignments.some(entry => entry.rarity) ? legend() : ''}<div class="rune-grid preset-rune-list">${preset.assignments.map((entry) => {
    const skill = (preset.skills || guide.skills).find((skill) => skill.id === entry.skill);
    return `<div data-rune-skill="${escape(entry.skill)}"><strong class="rune-skill">${asset(skill, 'small')}<span>${escape(skill.name)}</span></strong>${runeBadge(entry.rune, entry.rarity)}${entry.runeNote ? `<span class="rune-option-note">${escape(entry.runeNote)}</span>` : ''}</div>`;
  }).join('')}</div>${preset.pairNote ? `<p class="notice rune-pair">${escape(preset.pairNote)}</p>` : ''}${preset.shortDescription && preset.note ? `<p class="muted rune-preset-note">${escape(preset.note)}</p>` : ''}${preset.assignments.some((entry) => entry.popularity !== undefined || entry.alternativeNote) ? `<details class="rune-popularity"><summary>Frequências e alternativas · Bible snapshot</summary><ul>${preset.assignments.map((entry) => `<li><strong>${escape((preset.skills || guide.skills).find((skill) => skill.id === entry.skill).name)}</strong> — ${escape(entry.rune)} ${escape(entry.rarity)}${entry.popularity !== undefined ? ` · ${Number(entry.popularity).toFixed(2)}%` : ''}${entry.alternativeNote ? `<p>${escape(entry.alternativeNote)}</p>` : ''}</li>`).join('')}</ul></details>` : ''}`;
}

export function runesSection(guide, number = '05') {
  const presets = guide.runePresets || [];
  if (!presets.length) {
    if (guide.demonSkills) {
      const groups = [['Human Form', guide.skills], ['Demon Form', guide.demonSkills]];
      return section('runes', number, 'Runes', guide.runeNote || 'Runas fixas por forma.', legend() + groups.map(([name, skills]) => `<h3>${escape(name)}</h3><div class="rune-grid">${skills.filter(skill => skill.rune).map(skill => `<div><strong>${escape(skill.name)}</strong>${runeBadge(skill.rune, skill.rarity)}</div>`).join('')}</div>`).join(''));
    }
    // Keep the original single-setup markup; the existing text decorator supplies skill icons.
    return section('runes', number, 'Runes', 'A raridade faz parte do setup. Consulte a skill antes de equipar.', `${legend()}<div class="rune-grid">${guide.skills.filter((skill) => skill.rune).map((skill) => `<div><strong>${escape(skill.name)}</strong>${runeBadge(skill.rune, skill.rarity)}</div>`).join('')}</div>`);
  }
  const active = defaultRunePreset(guide);
  const controls = runePresetControls(guide);
  const panels = presets.map((preset, i) => `<div id="rune-preset-${i}" data-rune-panel="${escape(preset.id)}"${preset === active ? '' : ' hidden'}>${presetPanel(preset, guide)}</div>`).join('');
  return section('runes', number, 'Runes', '', panels + (guide.runePanels || []).map(infoPanel).join(''), controls);
}

export function bindRunePresets(root, syncSkills = false) {
  const container = root.querySelector('#runes');
  if (!container) return;
  const scope = syncSkills ? root : container;
  const buttons = [...scope.querySelectorAll('[data-rune-preset]')];
  const panels = [...scope.querySelectorAll('[data-rune-panel]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((entry) => entry.setAttribute('aria-pressed', String(entry.dataset.runePreset === button.dataset.runePreset)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.runePanel !== button.dataset.runePreset; });
  }));
}
