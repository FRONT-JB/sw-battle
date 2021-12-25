import { Injectable } from '@nestjs/common';

@Injectable()
export class MonstersService {
  private monsters = [];

  findMonsters() {
    return this.monsters;
  }
}
