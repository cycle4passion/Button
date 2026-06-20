import allThemesCss from '@layerstack/tailwind/themes/all.css?raw';
import { getThemeNames } from '@layerstack/tailwind';

export const themes = getThemeNames(allThemesCss);
