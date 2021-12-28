import { Monster } from './monster';

export interface Comment {
  id?: number;
  boardId: number;
  comment: Monster[];
}
