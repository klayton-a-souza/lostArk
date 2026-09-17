import reaper from './reaper-lunar-222.js';
import dimensionalist from './dimensionalist-time-wilder-222.js';
export const guides = [reaper, dimensionalist];
export const getGuide = (id) => guides.find((guide) => guide.id === id);
