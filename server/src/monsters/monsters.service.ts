import { Injectable } from '@nestjs/common';
import { findMonster } from '~/api/monster';

@Injectable()
export class MonstersService {
  async findMonsters(name: string) {
    const searchValue = decodeURI(name).toLowerCase();
    const { data } = await findMonster(searchValue);
    return data;
  }
}
