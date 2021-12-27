import { Monster } from './monster';

export interface Board {
  id: number;
  creator: CreatorInfo;
  content: PostContent;
}

export interface CreatorInfo {
  date: number;
  userName: string;
}

export interface PostContent {
  defense: Monster[];
}
