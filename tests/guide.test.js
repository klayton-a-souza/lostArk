import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import guide from '../data/reaper-lunar-222.js';
import { guides, getGuide } from '../data/registry.js';
import { renderGuide, sections } from '../js/guide-renderer.js';
import { escape } from '../js/components/ui.js';

test('every registered guide renders with valid internal section and skill references', () => {
  assert.equal(new Set(guides.map((item) => item.id)).size, guides.length);
  for (const item of guides) {
    assert.equal(getGuide(item.id), item);
    const html = renderGuide(item);
    assert.ok(!html.includes('undefined'));
    for (const [id] of sections) assert.ok(html.includes(`id="${id}"`));
    const ids = new Set(item.skills.map((skill) => skill.id));
    for (const id of [...item.gems.damage, ...item.gems.cooldown, ...item.rotation.swoops, ...item.rotation.blocks.flatMap((block) => block.skills)]) assert.ok(ids.has(id));
    for (const block of item.rotation.baseLoop) assert.ok(item.rotation.blocks.some((entry) => entry.id === block));
  }
});

test('Reaper setup preserves the supplied eight tripod codes and runes', () => {
  assert.deepEqual(guide.skills.map((skill) => [skill.name, skill.code.replaceAll('-', ''), skill.rune, skill.rarity]), [
    ['Shadow Vortex', '112', 'Wealth', 'Epic'], ['Shadow Double', '122', 'Wealth', 'Legendary'],
    ['Black Mist', '222', 'Wealth', 'Epic'], ['Glowing Brand', '221', 'Galewind', 'Legendary'],
    ['Shadow Trap', '332', 'Quick Recharge', 'Legendary'], ['Shadow Storm', '132', 'Wealth', 'Rare'],
    ['Spinning Dagger', '211', 'Wealth', 'Rare'], ['Silent Rage', '231', 'Galewind', 'Legendary'],
  ]);
  assert.ok(guide.skills.every((skill) => skill.tripods.length === 3));
  assert.equal(guide.stats.recommended, 1767);
  assert.equal(guide.gems.damage.length, 2);
  assert.equal(new Set(guide.gems.cooldown).size, 8);
  assert.equal(guide.gems.recommended['shadow-double'], 'Lv.10 recomendado');
  assert.equal(guide.recovery.length, 6);
});

test('rotation preserves four generators without assigning a fixed Swoop', () => {
  assert.equal(guide.rotation.baseLoop.join('-'), 'A-B-C-D-B-A-C-B-D');
  assert.equal(guide.rotation.blocks.length, 4);
  for (const block of guide.rotation.blocks) {
    assert.ok(!block.skills.some((id) => guide.rotation.swoops.includes(id)));
    assert.ok(!Object.hasOwn(block, 'swoop'));
  }
});

test('import code stays exact, including when rendered', () => {
  const expected = '59A734B6D8D2971410217AA603A89E913093F3F3D0A502754AF0471EC5B78D43A09BD1FCF2511438A099D768B4F9330B6F0D592DD7C85B4391797F54AF3596FC';
  assert.equal(guide.skillImport.code, expected);
  assert.ok(renderGuide(guide).includes(`>${expected}</code>`));
});

test('DPS placeholder has no invented percentages; future parse uses the existing component', () => {
  const empty = renderGuide(guide).split('id="dps"')[1].split('<section')[0];
  assert.ok(empty.includes(guide.dpsNote));
  assert.ok(!empty.includes('%'));
  const fixture = structuredClone(guide);
  fixture.dpsSpread = [{ skill: 'glowing-brand', percentage: 42 }];
  assert.ok(renderGuide(fixture).includes('value="42"'));
});

test('data text is escaped and all modules parse', async () => {
  assert.equal(escape('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('type="module"'));
  assert.ok(!html.includes(guide.skillImport.code));
});
