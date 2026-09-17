import { asset } from './ui.js';

// Enrich text mentions without changing the guide data or duplicating existing icons.
export function decorateSkillReferences(root, skills) {
  const namedSkills = skills.filter((skill) => skill.name && skill.icon);
  if (!namedSkills.length) return;

  const names = namedSkills.map((skill) => skill.name).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  const records = new Map(namedSkills.map((skill) => [skill.name, skill]));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  for (const node of nodes) {
    if (node.parentElement.closest('a, button, code, script, style, .asset, .skill-reference, .skill-title, .rotation-skill, .gem-skill, .rune-skill')) continue;
    const matches = [...node.textContent.matchAll(pattern)];
    if (!matches.length) continue;

    const fragment = document.createDocumentFragment();
    let offset = 0;
    for (const match of matches) {
      fragment.append(node.textContent.slice(offset, match.index));
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
