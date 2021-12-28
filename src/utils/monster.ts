import { Monster } from '~/types/monster';

export const handleMonsterPayload = (monster: Monster) => {
  const {
    id,
    url,
    bestiary_slug,
    com2us_id,
    family_id,
    name,
    image_filename,
    element,
    archetype,
    natural_stars,
  } = monster;

  return {
    id,
    url,
    bestiary_slug,
    com2us_id,
    family_id,
    name,
    image_filename,
    element,
    archetype,
    natural_stars,
  };
};
