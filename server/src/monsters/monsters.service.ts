import { Injectable } from '@nestjs/common';
import { findMonster } from '~/api/monster';

@Injectable()
export class MonstersService {
  private monsters = [];

  async findMonsters() {
    const monster = await findMonster();
    console.log(monster);
    return this.monsters;
  }
}
