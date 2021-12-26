import { PostAttackInfo } from './model/boards.model';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { v1 as uuid } from 'uuid';
import { findMonster } from '~/api/monster';

@Injectable()
export class BoardsService {
  boards = [];
  getAllBoard() {
    return this.boards;
  }

  createBoard(create: CreateBoardDto) {
    const { content } = create;

    const handleContentCheck = (list: PostAttackInfo) => {
      return list.id ? list : Object.assign(list, { id: uuid() });
    };

    const newContent = {
      ...content,
      attack: [...content.attack].map(handleContentCheck),
    };

    const createParams = {
      ...create,
      id: uuid(),
      content: newContent,
    };

    return this.boards.push(createParams);
  }

  getBoardById(id: string) {
    return this.boards.find((board) => board.id === id);
  }
}
