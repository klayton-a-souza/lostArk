import { asset } from './ui.js';

// Enrich text mentions without changing the guide data or duplicating existing icons.
export function decorateSkillReferences(root, skills) {
  // Match full names even without art: Blood Demonic Clone must never inherit Demonic Clone's icon.
  const namedSkills = skills.filter((skill) => skill.name);
  if (!namedSkills.some((skill) => skill.icon)) return;

  const names = namedSkills.map((skill) => skill.name).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  const records = new Map(namedSkills.map((skill) => [skill.name, skill]));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    if (node.parentElement.closest('a, button, code, script, style, .asset, .skill-reference, .skill-title, .skill-bar, .rotation-skill, .gem-skill, .rune-skill, .core-title, .tripods')) continue;
    const matches = [...node.textContent.matchAll(pattern)];
    if (!matches.length) continue;

    const fragment = document.createDocumentFragment();
    let offset = 0;
    for (const match of matches) {
      fragment.append(node.textContent.slice(offset, match.index));
      if (!records.get(match[0]).icon) {
        fragment.append(match[0]);
        offset = match.index + match[0].length;
        continue;
      }
      const reference = document.createElement('span');
      reference.className = 'skill-reference';
      reference.innerHTML = asset(records.get(match[0]), 'inline-skill');
      reference.append(match[0]);
      fragment.append(reference);
      offset = match.index + match[0].length;
    }
    fragment.append(node.textContent.slice(offset));
    node.replaceWith(fragment);
  }
}
