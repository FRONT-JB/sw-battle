import { Monster } from './monster';

export interface Board {
  id: number;
  keyword: string[];
  content: PostContent;
  user: User;
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
export interface PostContent {
  defense: Monster[];
}
