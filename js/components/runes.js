import { escape, asset, runeBadge, section } from './ui.js';

export const defaultRunePreset = (guide) => guide.runePresets?.find((preset) => preset.isDefault) || guide.runePresets?.[0];
const legend = () => `<div class="rune-legend">${['Legendary', 'Epic', 'Rare', 'Uncommon'].map((rarity) => runeBadge('Rune', rarity)).join('')}</div>`;

function presetPanel(preset, guide) {
  return `<p class="section-description">${escape(preset.shortDescription || preset.note)}</p>${legend()}<div class="rune-grid preset-rune-list">${preset.assignments.map((entry) => {
    const skill = guide.skills.find((skill) => skill.id === entry.skill);
    return `<div data-rune-skill="${escape(entry.skill)}"><strong class="rune-skill">${asset(skill, 'small')}<span>${escape(skill.name)}</span></strong>${runeBadge(entry.rune, entry.rarity)}</div>`;
  }).join('')}</div>${preset.pairNote ? `<p class="notice rune-pair">${escape(preset.pairNote)}</p>` : ''}${preset.shortDescription && preset.note ? `<p class="muted rune-preset-note">${escape(preset.note)}</p>` : ''}${preset.assignments.some((entry) => entry.popularity !== undefined || entry.alternativeNote) ? `<details class="rune-popularity"><summary>Frequências e alternativas · Bible snapshot</summary><ul>${preset.assignments.map((entry) => `<li><strong>${escape(guide.skills.find((skill) => skill.id === entry.skill).name)}</strong> — ${escape(entry.rune)} ${escape(entry.rarity)}${entry.popularity !== undefined ? ` · ${Number(entry.popularity).toFixed(2)}%` : ''}${entry.alternativeNote ? `<p>${escape(entry.alternativeNote)}</p>` : ''}</li>`).join('')}</ul></details>` : ''}`;
}

export function runesSection(guide) {
  const presets = guide.runePresets || [];
  if (!presets.length) {
    // Keep the original single-setup markup; the existing text decorator supplies skill icons.
    return section('runes', '05', 'Runes', 'A raridade faz parte do setup. Consulte a skill antes de equipar.', `${legend()}<div class="rune-grid">${guide.skills.map((skill) => `<div><strong>${escape(skill.name)}</strong>${runeBadge(skill.rune, skill.rarity)}</div>`).join('')}</div>`);
  }
  const active = defaultRunePreset(guide);
  const controls = presets.length > 1 ? `<div class="rune-preset-controls" role="group" aria-label="Preset de runas">${presets.map((preset, i) => `<button type="button" data-rune-preset="${escape(preset.id)}" aria-pressed="${preset === active}" aria-controls="rune-preset-${i}">${escape(preset.name)}</button>`).join('')}</div>` : '';
  const panels = presets.map((preset, i) => `<div id="rune-preset-${i}" data-rune-panel="${escape(preset.id)}"${preset === active ? '' : ' hidden'}>${presetPanel(preset, guide)}</div>`).join('');
  return section('runes', '05', 'Runes', '', panels, controls);
}

export function bindRunePresets(root) {
  const container = root.querySelector('#runes');
  if (!container) return;
  const buttons = [...container.querySelectorAll('[data-rune-preset]')];
  const panels = [...container.querySelectorAll('[data-rune-panel]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((entry) => entry.setAttribute('aria-pressed', String(entry === button)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.runePanel !== button.dataset.runePreset; });
  }));
}
