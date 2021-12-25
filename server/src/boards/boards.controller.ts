import { BoardsService } from './boards.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardSerivce: BoardsService) {}
  @Get()
  getAllBoard() {
    return this.boardSerivce.getAllBoard();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardSerivce.createBoard(createBoardDto);
  }

  @Get('/:boardId')
  getBoardById(@Param('boardId') id: string) {
    return this.boardSerivce.getBoardById(id);
  }
}
