// Class emblems (including community-supplied extraction). Provenance: assets/images/classes/sources.json
export const classIcons = {
  "dimensionalist": "assets/images/classes/dimensionalist.svg",
  "assassin": "assets/images/classes/assassin.svg",
  "deathblade": "assets/images/classes/deathblade.svg",
  "reaper": "assets/images/classes/reaper.svg",
  "shadowhunter": "assets/images/classes/shadowhunter.svg",
  "souleater": "assets/images/classes/souleater.svg",
  "gunner": "assets/images/classes/gunner.svg",
  "artillerist": "assets/images/classes/artillerist.svg",
  "deadeye": "assets/images/classes/deadeye.svg",
  "gunslinger": "assets/images/classes/gunslinger.svg",
  "sharpshooter": "assets/images/classes/sharpshooter.svg",
  "machinist": "assets/images/classes/machinist.svg",
  "mage": "assets/images/classes/mage.svg",
  "bard": "assets/images/classes/bard.svg",
  "sorceress": "assets/images/classes/sorceress.svg",
  "arcanist": "assets/images/classes/arcanist.svg",
  "summoner": "assets/images/classes/summoner.svg",
  "martial-artist": "assets/images/classes/martial-artist.svg",
  "breaker": "assets/images/classes/breaker.svg",
  "wardancer": "assets/images/classes/wardancer.svg",
  "glaivier": "assets/images/classes/glaivier.svg",
  "scrapper": "assets/images/classes/scrapper.svg",
  "striker": "assets/images/classes/striker.svg",
  "soulfist": "assets/images/classes/soulfist.svg",
  "specialist": "assets/images/classes/specialist.svg",
  "artist": "assets/images/classes/artist.svg",
  "aeromancer": "assets/images/classes/aeromancer.svg",
  "warrior": "assets/images/classes/warrior.svg",
  "berserker": "assets/images/classes/berserker.svg",
  "destroyer": "assets/images/classes/destroyer.svg",
  "gunlancer": "assets/images/classes/gunlancer.svg",
  "paladin": "assets/images/classes/paladin.svg",
  "slayer": "assets/images/classes/slayer.svg",
  "valkyrie": "assets/images/classes/valkyrie.svg",
  "wildsoul": "assets/images/classes/wildsoul.svg",
  "guardianknight": "assets/images/classes/guardianknight.svg"
};

export const getClassIcon = (name = '') => {
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return Object.entries(classIcons).find(([slug]) => slug.replaceAll('-', '') === key)?.[1];
};
