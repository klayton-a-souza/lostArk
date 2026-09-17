import reaper from './reaper-lunar-222.js';
export const guides = [reaper];
export const getGuide = (id) => guides.find((guide) => guide.id === id);
