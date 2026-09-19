import reaper from './reaper-lunar-222.js';
import dimensionalist from './dimensionalist-time-wilder-222.js';
import shadowhunter from './shadowhunter-demonic-impulse-332.js';
import valkyrie from './valkyrie-shining-knight-111.js';
export const guides = [reaper, dimensionalist, shadowhunter, valkyrie];
export const getGuide = (id) => guides.find((guide) => guide.id === id);
