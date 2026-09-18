import test from 'node:test';
import assert from 'node:assert/strict';
import guide from '../data/shadowhunter-demonic-impulse-332.js';
import { renderGuide, getSections } from '../js/guide-renderer.js';
import { importCodes } from '../js/components/guide-panels.js';
import { skillCard, arkCoreCard } from '../js/components/ui.js';

test('332 has the supplied human setup, demon keys, fixed runes and eleven gem slots', () => {
  assert.deepEqual(guide.skills.map(({ name, level, code }) => [name, level, code]), [
    ['Demonic Slash', 10, '132'], ['Spinning Dive', 10, '212'], ['Rising Claw', 10, '232'], ['Demonic Clone', 10, '331'],
    ['Demon Vision', 14, '131'], ['Decimate', 14, '211'], ["Demon's Grip", 14, '322'], ['Howl', 14, '322'],
  ]);
  assert.deepEqual(guide.demonSkills.map(({ key, name }) => [key, name]), [
    ['Q', 'Ruining Rush'], ['W', 'Death Claw'], ['E', 'Destruction'], ['R', 'Gore Bleeding'], ['A', 'Leaping Blow'],
    ['S', 'Blood Massacre'], ['D', 'Blood Vortex'], ['F', 'Bloody Piercing'], ['X', 'Blood Demonic Clone'], ['T', 'Blood Marsh'], ['V', 'Fallen Ruin'],
  ]);
  assert.deepEqual([...guide.skills, ...guide.demonSkills].filter(s => s.rune).map(({ name, rune, rarity }) => [name, rune, rarity]), [
    ['Demon Vision', 'Wealth', 'Legendary'], ['Death Claw', 'Quick Recharge', 'Legendary'], ['Destruction', 'Rage', 'Legendary'],
    ['Gore Bleeding', 'Galewind', 'Legendary'], ['Leaping Blow', 'Galewind', 'Epic'], ['Blood Massacre', 'Vision', 'Legendary'],
    ['Blood Vortex', 'Galewind', 'Legendary'], ['Bloody Piercing', 'Galewind', 'Epic'],
  ]);
  assert.deepEqual(guide.gems.damage, ['blood-demonic-clone', 'blood-vortex', 'bloody-piercing', 'gore-bleeding', 'blood-massacre']);
  assert.deepEqual(guide.gems.cooldown, ['blood-vortex', 'bloody-piercing', 'gore-bleeding', 'leaping-blow', 'blood-massacre', 'demon-vision']);
});

test('332 guide integrates optional sections and preserves its single build scope', () => {
  const html = renderGuide(guide);
  assert.doesNotMatch(html, /undefined|NaN|Persona|Swoop|Piercing Thorn|Perfect Suppression|Hit Master|Chaos Cores|Skill Import Code|data-rune-preset=/);
  assert.equal((html.match(/class="skill-card /g) || []).length, 19);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [id] of getSections(guide)) { assert.ok(ids.includes(id)); assert.ok(html.includes(`href="#${id}"`)); }
  assert.deepEqual(guide.arkGrid.order.map(c => c.name), ['Ominous', 'Demonic Clone', 'Critical Claws']);
  assert.deepEqual(guide.arkGrid.priorities, { Relic: ['Demonic Clone', 'Critical Claws', 'Ominous'], Ancient: ['Critical Claws', 'Demonic Clone', 'Ominous'] });
  assert.deepEqual(guide.engravings, ['Grudge', 'Adrenaline', 'Keen Blunt Weapon', 'Raid Captain', 'Cursed Doll']);
  assert.deepEqual(guide.rotation.panels.find(p => p.id === 'core-loop').shortcut, ['D', 'F', 'X', 'A', 'X']);
  assert.deepEqual(guide.rotation.panels.find(p => p.id === 'opener').shortcut, ['D', 'F', 'X', 'T', 'A', 'X']);
  assert.equal(guide.arkPassive.length, 3);
  assert.match(html, /90–98%/);
  assert.match(html, /1777\+/);
});

test('missing optional human runes, demon tripods and import codes render without fake data', () => {
  assert.equal(importCodes(undefined), '');
  assert.doesNotMatch(skillCard(guide.skills[0]), /class="skill-rune"/);
  const clone = skillCard(guide.demonSkills.find(s => s.key === 'X'));
  assert.match(clone, /Key X/);
  assert.match(clone, /Sem runa/);
  assert.doesNotMatch(clone, /class="tripods"|class="skill-rune"|Lv\d/);
});

test('Ark Grid details preserve 332 positions and the supplied 17P rarity differences', () => {
  const [sun, moon, star] = guide.arkGrid.order;
  assert.deepEqual(guide.arkGrid.order.map(({ slot, position }) => [slot, position]), [['Sun', 3], ['Moon', 3], ['Star', 2]]);
  assert.deepEqual(guide.arkGrid.order.map(core => core.points.find(p => p.value === 17).rarities), [
    [{ name: 'Relic', effect: '+5%' }, { name: 'Ancient', effect: '+6%' }],
    [{ name: 'Relic', effect: '+18%' }, { name: 'Ancient', effect: '+20%' }],
    [{ name: 'Relic', effect: '+9%' }, { name: 'Ancient', effect: '+14%' }],
  ]);
  const point = (core, value) => core.points.find(p => p.value === value);
  assert.match(point(sun, 14).text, /−30%.*8 segundos.*Encroachment Skills.*Destiny: Ominous/);
  assert.deepEqual(point(sun, 14).flow, ['Leaping Blow [A]', 'Frenzied Chaos', 'Blood Demonic Clone [X]']);
  assert.match(point(moon, 14).text, /Demonize, Destiny é ativado/);
  assert.match(point(moon, 17).note, /Casting Speed \+20% em ambas/);
  assert.match(point(star, 14).text, /Blood Vortex \[D\] Damage \+10%/);
  assert.match(point(star, 10).text, /Cooldown −3 segundos e Casting Speed \+20%/);
  for (const core of guide.arkGrid.order) {
    assert.deepEqual(core.points.map(p => p.value), [10, 14, 17, '18–20']);
    assert.match(point(core, '18–20').text, /18P: Demon Skill Damage \+0.2%. 19P: \+0.2%. 20P: \+0.2%/);
    const html = arkCoreCard(core, 'order', []);
    assert.match(html, /Gameplay.*Breakpoint/);
    assert.match(html, /Major Power Spike/);
    assert.match(html, /Scaling/);
    assert.match(html, /Relic[\s\S]*Ancient/);
  }
  assert.match(renderGuide(guide), /Why 332 Works/);
  assert.match(renderGuide(guide), /Chaos Sliver ×2/);
});

test('optional detailed core fields remain escaped and legacy breakpoint markup is preserved', () => {
  const fixture = structuredClone(guide.arkGrid.order[0]);
  fixture.points[1].label = '<script>bad</script>';
  fixture.points[2].rarities[0].effect = '<img src=x onerror=bad>';
  const html = arkCoreCard(fixture, 'order', []);
  assert.doesNotMatch(html, /<script>|<img src=x/);
  assert.match(html, /&lt;script&gt;/);
  const legacy = arkCoreCard({ slot: 'Sun', name: 'Existing Core', points: [{ value: 14, text: 'Original effect' }] }, 'order', []);
  assert.match(legacy, /<div class="breakpoint"><b>14P<\/b><p>Original effect<\/p><\/div>/);
  assert.doesNotMatch(legacy, /core-card-detailed|core-rarities|Gameplay Breakpoint/);
});
