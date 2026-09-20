import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import guide from '../data/reaper-lunar-222.js';
import dimensionalist from '../data/dimensionalist-time-wilder-222.js';
import { guides, getGuide } from '../data/registry.js';
import { renderGuide, getSections } from '../js/guide-renderer.js';
import { defaultRunePreset, runesSection, bindRunePresets } from '../js/components/runes.js';
import { escape, skillCard } from '../js/components/ui.js';

test('every registered guide renders with valid internal section and skill references', () => {
  assert.equal(guides.length, 5);
  assert.equal(new Set(guides.map((item) => item.id)).size, guides.length);
  for (const item of guides) {
    assert.equal(getGuide(item.id), item);
    const html = renderGuide(item);
    assert.ok(!html.includes('undefined'));
    for (const [id] of getSections(item)) assert.ok(html.includes(`id="${id}"`));
    const allSkills = [...item.skills, ...(item.demonSkills || [])];
    const ids = new Set(allSkills.map((skill) => skill.id));
    assert.equal(ids.size, allSkills.length);
    const targets = new Set([...ids, ...Object.keys(item.gemTargets || {})]);
    for (const id of [...item.gems.damage, ...item.gems.cooldown, ...(item.damagePriority || []).flatMap((group) => group.skills)]) assert.ok(targets.has(id), id);
    for (const id of [...(item.rotation.swoops || []), ...(item.rotation.blocks || []).flatMap((block) => block.skills), ...(item.skillSnapshot?.entries || []).map((entry) => entry.skill), ...(item.runePresets || []).flatMap((preset) => preset.assignments.map((entry) => entry.skill))]) assert.ok(ids.has(id) || (item.runePresets || []).some(preset => preset.skills?.some(skill => skill.id === id)), id);
    for (const block of item.rotation.baseLoop || []) assert.ok(item.rotation.blocks.some((entry) => entry.id === block));
    for (const source of item.sources) assert.equal(new URL(source.url).protocol, 'https:');
    for (const core of [...item.arkGrid.order, ...item.arkGrid.chaos]) if (core.source) assert.ok(item.sources.some((source) => source.id === core.source));
  }
});

test('Dimensionalist preserves eight Global skills and cycle-optimized levels, tripods and runes', () => {
  assert.deepEqual(dimensionalist.skills.map(({ name, level, code, rune }) => [name, level, code, rune]), [
    ['Needle Strike', 11, '2-3-1', 'Quick Recharge'], ['Forewarning', 7, '1-2', 'Rage'],
    ['Pinpoint Strike', 14, '1-2-1', 'Galewind'], ['Boundary Break', 14, '1-3-1', 'Galewind'],
    ['Cross Thrust', 14, '2-1-1', 'Galewind'], ['Airsplitter', 10, '1-1-1', 'Quick Recharge'],
    ['Temporal Crush', 14, '2-2-2', 'Rage'], ['Dimensional Break', 14, '1-2-2', 'Galewind'],
  ]);
  assert.equal(dimensionalist.skills.find((s) => s.id === 'dimensional-break').role, 'MAIN DAMAGE');
  const forewarning = skillCard(dimensionalist.skills[1]);
  assert.match(forewarning, /Lv7/);
  assert.equal((forewarning.match(/Tier /g) || []).length, 2);
  assert.equal((skillCard(guide.skills[0]).match(/Tier /g) || []).length, 3);
  const oneTripod = skillCard({ ...dimensionalist.skills[1], tripods: ['Armor Destruction'], code: undefined, level: undefined, runeAlternative: 'Alternative rune note' });
  assert.equal((oneTripod.match(/Tier /g) || []).length, 1);
  assert.ok(!oneTripod.includes('<code>'));
  assert.match(oneTripod, /Alternative rune note/);
});

test('Dimensionalist gems use six damage and five cooldown targets without a filler or ninth skill', () => {
  assert.deepEqual(dimensionalist.gems.damage, ['dimensional-break', 'timeline-skill', 'boundary-break', 'cross-thrust', 'temporal-crush', 'pinpoint-strike']);
  assert.deepEqual(dimensionalist.gems.cooldown, ['dimensional-break', 'boundary-break', 'cross-thrust', 'temporal-crush', 'airsplitter']);
  const html = renderGuide(dimensionalist);
  const gems = html.split('id="gems"')[1].split('<section')[0];
  assert.match(gems, /6 Damage/);
  assert.match(gems, /5 Cooldown/);
  assert.match(gems, /Timeline Skill/);
  assert.doesNotMatch(gems, /Filler|filler/);
  assert.match(renderGuide(guide), /11th Gem — Filler/);
  assert.equal((html.match(/class="skill-card /g) || []).length, 8);
  assert.equal(dimensionalist.skills.some((s) => s.id === 'timeline-skill'), false);
});

test('Dimensionalist import codes are exact and separately rendered', () => {
  const primary = 'EEDB6EDA73A7D87B4FAAA4EB5AE267CB37888CE3E3CC56529EA5DCBA375A9D8DED191D2C0EA620C748647139D97AFE6AE47FF258D6CC8D356BAB451DCB6EB180';
  const alternative = 'FF7858F5CD3F9DCB6F211EB80E6544F4E80C6E8E4DCCBD507C7ACE373D804D997CDC9311FDED301391B0AF9D2EE186B3B74DF4247EDF45DE14985B69FCBB69E4';
  assert.equal(dimensionalist.skillImport.code, primary);
  assert.equal(dimensionalist.skillImport.alternatives[0].code, alternative);
  const html = renderGuide(dimensionalist);
  assert.ok(html.includes(`>${primary}</code>`));
  assert.ok(html.includes(`>${alternative}</code>`));
  assert.equal((html.match(/class="import-code-disclosure"/g) || []).length, 2);
  assert.equal((html.match(/role="tab"/g) || []).length, 2);
});

test('rune presets remain complete and paired, population snapshot is separate', () => {
  const [cycle, bible] = dimensionalist.runePresets;
  for (const entry of cycle.assignments) { const skill = dimensionalist.skills.find((skill) => skill.id === entry.skill); assert.equal(entry.rune, skill.rune); assert.equal(entry.rarity, skill.rarity); }
  const getRune = (preset, id) => preset.assignments.find((entry) => entry.skill === id).rune;
  assert.equal(getRune(cycle, 'forewarning'), 'Rage');
  assert.equal(getRune(cycle, 'dimensional-break'), 'Galewind');
  assert.equal(getRune(bible, 'forewarning'), 'Conviction');
  assert.equal(getRune(bible, 'dimensional-break'), 'Judgment');
  for (const preset of dimensionalist.runePresets) assert.equal(new Set(preset.assignments.map((entry) => entry.skill)).size, 8);
  assert.equal(dimensionalist.skillSnapshot.entries.length, 8);
  const html = renderGuide(dimensionalist);
  assert.match(html, /Cycle-Optimized 222 Setup/);
  assert.match(html, /Bible Population Snapshot/);
});

test('cores, engravings and rotation models retain build-specific semantics', () => {
  assert.deepEqual(dimensionalist.engravings, ['Grudge', 'Adrenaline', 'Keen Blunt Weapon', 'Hit Master', 'Cursed Doll']);
  assert.deepEqual(dimensionalist.arkGrid.order.map((core) => core.name), ['Twisted Timeline', 'Timeline', 'Distortion']);
  assert.deepEqual(dimensionalist.arkGrid.chaos.map((core) => core.name), ['Flashy Attack', 'Smoldering Strike', 'Attack']);
  assert.equal(dimensionalist.rotation.type, 'priority-cycle');
  assert.equal(dimensionalist.stats.recommended, undefined);
  assert.equal(dimensionalist.arkGrid.priorities, undefined);
  const html = renderGuide(dimensionalist);
  assert.match(html, /Priority System/);
  assert.doesNotMatch(html, /Persona|Swoop|Minimum functional breakpoint|Recommended Spec|Official ↗/);
  assert.match(renderGuide(guide), /1767\+/);
  const explicit = structuredClone(guide);
  explicit.rotation.type = 'block-loop';
  assert.equal(renderGuide(explicit), renderGuide(guide));
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
  const expected = 'D055DE5564D82237A17C5009CF0CF62ECE33980201CE8E4B04CD14911FC9212EB9CA41776ED0B72E8BA5CE47CECF3FE6766C0891F1F2D2380B970024F311F036';
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


test('rune rarities match both requested presets exactly', () => {
  assert.equal(dimensionalist.runePresets.length, 2);
  assert.equal(defaultRunePreset(dimensionalist).id, 'cycle-optimized');
  const expected = [
    [['cross-thrust','Galewind','Legendary'],['boundary-break','Galewind','Epic'],['temporal-crush','Rage','Epic'],['pinpoint-strike','Galewind','Epic'],['dimensional-break','Galewind','Legendary'],['needle-strike','Quick Recharge','Legendary'],['airsplitter','Quick Recharge','Epic'],['forewarning','Rage','Legendary']],
    [['cross-thrust','Galewind','Legendary'],['boundary-break','Galewind','Legendary'],['temporal-crush','Rage','Legendary'],['pinpoint-strike','Galewind','Epic'],['dimensional-break','Judgment','Legendary'],['needle-strike','Quick Recharge','Legendary'],['airsplitter','Rage','Epic'],['forewarning','Conviction','Legendary']],
  ];
  dimensionalist.runePresets.forEach((preset,i)=>assert.deepEqual(preset.assignments.map(({skill,rune,rarity})=>[skill,rune,rarity]),expected[i]));
  assert.deepEqual(dimensionalist.runePresets[1].assignments.map(entry=>entry.popularity),[48.91,90.02,43.64,54.01,72.64,88.73,41.79,73.31]);
});

test('preset controls are absent for zero or one preset and honor explicit default', () => {
  assert.doesNotMatch(runesSection(guide), /data-rune-preset=/);
  const single={...dimensionalist,runePresets:[dimensionalist.runePresets[0]]};
  assert.doesNotMatch(runesSection(single), /data-rune-preset=/);
  assert.match(runesSection(single), /rune-legend/);
  const reversed={...dimensionalist,runePresets:[...dimensionalist.runePresets].reverse()};
  assert.equal(defaultRunePreset(reversed).id,'cycle-optimized');
  assert.match(runesSection(reversed), /data-rune-preset="cycle-optimized" aria-pressed="true"/);
  assert.doesNotMatch(runesSection(reversed), /undefined/);
});

test('local preset controller switches and restores whole panels without mutating guide data', () => {
  const before=JSON.stringify(dimensionalist);
  const buttons=dimensionalist.runePresets.map(preset=>({dataset:{runePreset:preset.id}, attrs:{},setAttribute(key,value){this.attrs[key]=value;},addEventListener(type,handler){this.click=handler;}}));
  const panels=dimensionalist.runePresets.map((preset,i)=>({dataset:{runePanel:preset.id},hidden:!!i}));
  bindRunePresets({querySelector:()=>({querySelectorAll:selector=>selector==='[data-rune-preset]'?buttons:panels})});
  buttons[1].click();assert.deepEqual(panels.map(p=>p.hidden),[true,false]);assert.equal(buttons[1].attrs['aria-pressed'],'true');
  buttons[0].click();assert.deepEqual(panels.map(p=>p.hidden),[false,true]);assert.equal(buttons[1].attrs['aria-pressed'],'false');
  assert.equal(JSON.stringify(dimensionalist),before);
});
