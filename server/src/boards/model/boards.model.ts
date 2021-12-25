import { Monster } from '~/monsters/model/monster.model';

export interface Post {
  creator: CreatorInfo;
  content: PostContent;
}

export interface CreatorInfo {
  date: number;
  userName: string;
}

export interface PostContent {
  defense: Monster[];
  attack: PostAttackInfo[];
}

export interface PostAttackInfo {
  id?: string;
  creator: CreatorInfo;
  info: Monster[];
}
