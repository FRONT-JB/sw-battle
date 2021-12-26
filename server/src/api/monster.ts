import axios from 'axios';
import { BASE_URL } from './common';

export const findMonster = async () => {
  const url = `${BASE_URL}/api/v2/monsters`;
  return await axios.get(url);
};
