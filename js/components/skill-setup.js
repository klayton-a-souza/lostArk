import { escape, asset, skillCard } from './ui.js';
import { defaultRunePreset, runePresetControls } from './runes.js';

function skillList(skills, showBar, label = 'Standard') {
  const bar = showBar ? `<ul class="skill-bar" aria-label="Skills da ${escape(label)}">${skills.map(skill => `<li>${asset(skill, 'small')}<span>${escape(skill.name)}</span></li>`).join('')}</ul>` : '';
  const groups = [...new Set(skills.map(skill => skill.category).filter(Boolean))];
  return bar + (groups.length ? groups.map(category => `<h3 class="group-label">${escape(category)}</h3><div class="skill-grid">${skills.filter(skill => skill.category === category).map(skillCard).join('')}</div>`).join('') : `<div class="skill-grid">${skills.map(skillCard).join('')}</div>`);
}

export function skillSetup(guide) {
  const presets = guide.runePresets || [];
  const active = defaultRunePreset(guide);
  const skills = presets.some(preset => preset.skills)
    ? runePresetControls(guide, 'skill') + presets.map((preset, i) => `<div id="skill-preset-${i}" data-rune-panel="${escape(preset.id)}"${preset === active ? '' : ' hidden'}><h3>${escape(preset.name)}</h3><p>${escape(preset.note)}</p>${skillList(preset.skills || guide.skills, guide.skillBar, preset.name)}</div>`).join('')
    : skillList(guide.skills, guide.skillBar);
  const special = (guide.specialSkillGroups || []).length
    ? `<div class="special-skill-groups">${guide.specialSkillGroups.map(group => `<div class="special-skill-group"><h3 class="group-label">${escape(group.title)}</h3><div class="skill-grid">${group.skills.map(skillCard).join('')}</div></div>`).join('')}</div>`
    : '';
  return skills + special;
}
