export interface Monster {
  id: number;
  url: string;
  bestiary_slug: string;
  com2us_id: number;
  family_id: number;
  name: string;
  image_filename: string;
  element: string;
  archetype: string;
  natural_stars: number;
}

export interface MonsterResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Monster[];
}
