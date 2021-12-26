import { valueTypes } from '~/types';

export const MONSTER_ELEMENTS = {
  FIRE: 'fire',
  WATER: 'water',
  WIND: 'wind',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ElementTypes = valueTypes<typeof MONSTER_ELEMENTS>;
