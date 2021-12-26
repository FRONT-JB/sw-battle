import axios from 'axios';
import { BASE_URL } from './common';

export const findMonster = async (name: string) => {
  const url = `${BASE_URL}/monsters/?name=${name}`;
  return await axios.get(url);
};
