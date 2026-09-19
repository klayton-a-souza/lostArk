import test from 'node:test';
import assert from 'node:assert/strict';
import guide from '../data/valkyrie-shining-knight-111.js';
import { renderGuide } from '../js/guide-renderer.js';

test('Valkyrie Standard preserves the supplied eight skills, tripods, levels and runes', () => {
  assert.deepEqual(guide.skills.map(({ name, level, rune, tripods }) => [name, level, rune, tripods]), [
    ['Requiem Rain', 14, 'Judgment', ['Swift Fingers', 'Light of Destiny', "Archangel's Sword"]],
    ['Requiem Ash', 14, 'Conviction', ['Swift Fingers', 'Divine Concentration', 'Execution']],
    ['Whisper of Judgment', 14, 'Bleed', ['Pilgrim', 'Precise Sword Strike', "Storm's Protection"]],
    ['Meteor Strike', 14, 'Galewind', ['Swift Fingers', 'Enhanced Stab', 'Double Stab']],
    ['Lunging Stab', 10, 'Purify', ['Weak Point Enhancement', 'Nimble Movement', 'Focused Blow']],
    ['Crushing Condemnation', 14, 'Galewind', ['Swift Fingers', 'Weak Point Detection', 'Storm Stampede']],
    ['Sword of Revelation', 11, 'Quick Recharge', ['Nimble Movement', 'Holy Outburst', 'Double Cross']],
    ['Foresight Slash', 7, 'Poison', ['Target Weak Point', 'Brutal Honesty']],
  ]);
  assert.ok(guide.skills.every(skill => !skill.rarity && !skill.code));
  assert.equal(guide.runePresets.length, 1);
  assert.equal(guide.rotation.type, 'priority-cycle');
  assert.deepEqual(guide.arkGrid.order.map(core => [core.slot, core.position, core.name]), [['Sun', 1, 'Final Words'], ['Moon', 1, 'Knight of Finality'], ['Star', 1, 'True End']]);
});

test('Valkyrie renders all eleven gems with explicit priority groups and no gem levels', () => {
  assert.deepEqual(guide.gems.damage, ['final-splendor', 'requiem-rain', 'requiem-ash', 'whisper-of-judgment']);
  assert.equal(new Set(guide.gems.cooldown).size, 7);
  assert.ok(![...guide.gems.damage, ...guide.gems.cooldown].includes('foresight-slash'));
  assert.deepEqual(guide.gems.damage.map(id => guide.gems.damageRanks[id]), ['S', 'A', 'A', 'B']);
  assert.deepEqual(guide.gems.cooldown.map(id => guide.gems.cooldownRanks[id]), ['A', 'A', 'B', 'C', 'C', 'C', 'C']);
  const html = renderGuide(guide);
  const gems = html.split('id="gems"')[1].split('<section')[0];
  assert.doesNotMatch(gems, /Lv\.?\s*\d|Level|undefined/);
  assert.match(gems, /role="cell">S<\/span>/);
  assert.equal((gems.match(/class="gem-skill"/g) || []).length, 11);
  assert.match(html, /Trinity III/);
  assert.match(html, /Last Light II/);
  assert.match(html, /Z — Shining Knight/);
  assert.match(html, /X — Final Splendor/);
  assert.match(html, /Final Splendor CPM/);
  assert.match(html, /Brundia&#39;s Epiphany/);
  assert.match(html, /Brundia&#39;s Incarnation/);
  assert.match(html, /Cataclysm/);
  assert.doesNotMatch(html, /data-rune-preset=|role="tab"|Infinite Mana|Persona|Swoop/);
});
