import test from 'node:test';
import assert from 'node:assert/strict';
import guide from '../data/wildsoul-ferality-222.js';
import { renderGuide } from '../js/guide-renderer.js';
import { bindRunePresets } from '../js/components/runes.js';
import { runeBadge } from '../js/components/ui.js';

test('rune rarity is explicit for every Wildsoul option', () => {
  for (const preset of guide.runePresets) {
    assert.equal(preset.skills.length, 8);
    for (const skill of preset.skills) {
      for (const option of Object.values(skill.runeOptions).flat()) {
        assert.equal(typeof option.name, 'string');
        assert.ok(Object.hasOwn(option, 'rarity'));
        assert.ok(['Legendary', 'Epic', 'Rare', 'Uncommon'].includes(option.rarity));
      }
      const selected = (skill.runeOptions.recommended || skill.runeOptions.situational)[0];
      const assignment = preset.assignments.find(entry => entry.skill === skill.id);
      assert.equal(assignment.rune, selected.name);
      assert.equal(assignment.rarity, selected.rarity);
    }
  }
  assert.match(runeBadge({ name: 'Quick Recharge', rarity: 'Legendary' }), /<small>Legendary<\/small>/);
  assert.match(runeBadge({ name: 'Quick Recharge', rarity: 'Epic' }), /<small>Epic<\/small>/);
  assert.match(runeBadge({ name: 'Quick Recharge', rarity: null }), /Rarity not specified/);
  assert.doesNotMatch(runeBadge('Quick Recharge'), /Rarity not specified/);
  assert.doesNotMatch(renderGuide(guide), /\[object Object\]/);
});

test('core targets and minima are visible outside the breakpoint disclosure', () => {
  const html = renderGuide(guide);
  const cards = html.split('<article class="core-card ').slice(1, 4);
  guide.arkGrid.order.forEach((core, i) => {
    assert.equal(core.rarity, 'Ancient');
    assert.equal(core.minimumRarity, 'Relic');
    assert.equal(core.breakpoint, 17);
    const summary = cards[i].split('<details')[0];
    assert.match(summary, /Target Rarity/);
    assert.match(summary, /Ancient/);
    assert.match(summary, /Relic/);
    assert.match(summary, /17P\+/);
    assert.deepEqual(core.points.find(point => point.value === 17).rarities.map(entry => entry.name), ['Relic', 'Ancient']);
  });
});

test('Wildsoul 222 preserves post-patch mechanics and separates special skills', () => {
  assert.deepEqual(guide.arkGrid.order.map(c => [c.slot, c.position, c.name]), [['Sun', 2, 'Bear Frenzy'], ['Moon', 2, 'Strong Bear'], ['Star', 2, 'Deadly Bear']]);
  assert.deepEqual(guide.arkGrid.order[0].points.find(p => p.value === 17).rarities.map(r => r.effect), ['+8.5% Ripping Bear Damage', '+10.5% Ripping Bear Damage']);
  assert.deepEqual(guide.skills.map(s => s.name), ['Boulder Bear', 'Swish Bear', 'Digger Bear', 'Growling Bear', 'Ursine Windup', 'Rolling Wheel', 'Claw', 'Vulpine Velocity']);
  assert.equal(guide.skills.filter(s => s.category === 'Bear Shapeshift').length, 4);
  assert.equal(guide.skills.filter(s => s.tag === '2 CHARGES').length, 2);
  assert.equal(guide.specialSkillGroups[0].skills[0].category, 'Forbidden Sorcery');
  assert.equal(guide.specialSkillGroups[1].skills[0].name, 'One-Hit Bear');
  const resonance = guide.arkPassive.find(b => b.title.includes('Bestial Resonance'));
  assert.deepEqual(resonance.tiers.map(([level, effect]) => effect), [0,1,2,3,4].map(n => `Shapeshift Damage +${n}% · cooldown -3%`));
  const html = renderGuide(guide);
  assert.match(html, /DESTINY ACTIVATOR/);
  assert.match(html, /Push Immunity/);
  assert.match(html, /IMPORTANT · Gauge cheio precisa de Bear Form/);
  assert.equal((html.match(/class="core-details"/g) || []).length, 3);
  assert.doesNotMatch(html, /undefined|Persona|Swoop/);
});

test('Wildsoul gems show eleven priorities without levels or a fixed side-node allocation', () => {
  assert.deepEqual(guide.gems.damage.map(id => guide.gems.damageRanks[id]), ['S', 'B', 'B', 'C', 'C']);
  assert.deepEqual(guide.gems.cooldown.map(id => guide.gems.cooldownRanks[id]), ['A', 'A', 'A', 'B', 'B', 'C']);
  const html = renderGuide(guide).split('id="gems"')[1].split('<section')[0];
  assert.equal((html.match(/class="gem-skill"/g) || []).length, 11);
  assert.doesNotMatch(html, /Lv\.?\s*\d|Level|undefined/);
  assert.equal(guide.stats.reference, 1800);
  assert.ok(guide.skills.every(s => !s.level && !s.code && !s.rarity));
});

test('Advanced replaces exactly one slot and changes the rune pair without mutating Standard', () => {
  const [standard, advanced] = guide.runePresets;
  assert.equal(standard.isDefault, undefined);
  assert.equal(advanced.isDefault, true);
  assert.equal(advanced.skills.length, 8);
  assert.deepEqual(advanced.skills.slice(0, 7).map(s => s.id), standard.skills.slice(0, 7).map(s => s.id));
  assert.equal(advanced.skills[7].id, 'tailwind');
  assert.equal(standard.skills[7].id, 'vulpine-velocity');
  const rune = (preset, id) => preset.assignments.find(a => a.skill === id).rune;
  assert.equal(rune(advanced, 'tailwind'), 'Conviction');
  assert.equal(rune(advanced, 'ursine-windup'), 'Judgment');
  assert.equal(rune(standard, 'ursine-windup'), 'Galewind');
  assert.ok(!standard.assignments.some(a => /Conviction|Judgment/.test(a.rune)));
  const html = renderGuide(guide);
  assert.match(html, /id="skill-preset-0" data-rune-panel="standard" hidden/);
  assert.match(html, /id="rune-preset-0" data-rune-panel="standard" hidden/);
});

test('Wildsoul runes match the supplied main and beginner rarity table', () => {
  const [standard, advanced] = guide.runePresets;
  const read = (preset, id) => preset.assignments.find(entry => entry.skill === id);
  assert.deepEqual(advanced.assignments.map(a => [a.skill, a.rune, a.rarity]), [
    ['boulder-bear', 'Wealth', 'Epic'], ['swish-bear', 'Wealth', 'Epic'], ['digger-bear', 'Wealth', 'Rare'],
    ['growling-bear', 'Wealth', 'Legendary'], ['ursine-windup', 'Judgment', 'Legendary'],
    ['rolling-wheel', 'Quick Recharge', 'Legendary'], ['claw', 'Purify', 'Legendary'], ['tailwind', 'Conviction', 'Legendary'],
  ]);
  assert.deepEqual([read(standard, 'vulpine-velocity'), read(standard, 'ursine-windup')].map(a => [a.rune, a.rarity]), [['Quick Recharge', 'Epic'], ['Galewind', 'Legendary']]);
  const claw = guide.skills.find(s => s.id === 'claw');
  assert.deepEqual(claw.runeOptions.alternative[0], { name: 'Quick Recharge', rarity: 'Rare', note: 'pode ser utilizado no lugar de Purify quando Cleanse não for necessário no conteúdo' });
});

test('synchronized controls switch skills and runes together in both directions', () => {
  const before = JSON.stringify(guide);
  const buttons = ['standard','advanced','standard','advanced'].map(id => ({ dataset: { runePreset: id }, attrs: {}, setAttribute(k,v) { this.attrs[k]=v; }, addEventListener(type, handler) { this.click=handler; } }));
  const panels = ['standard','advanced','standard','advanced'].map(id => ({ dataset: { runePanel: id }, hidden: id !== 'standard' }));
  const root = { querySelector: () => ({}), querySelectorAll: selector => selector === '[data-rune-preset]' ? buttons : panels };
  bindRunePresets(root, true);
  buttons[1].click();
  assert.deepEqual(panels.map(p => p.hidden), [true,false,true,false]);
  assert.deepEqual(buttons.map(b => b.attrs['aria-pressed']), ['false','true','false','true']);
  buttons[2].click();
  assert.deepEqual(panels.map(p => p.hidden), [false,true,false,true]);
  assert.equal(JSON.stringify(guide), before);
});
