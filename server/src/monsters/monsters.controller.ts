import { Controller, Get, Param } from '@nestjs/common';
import { MonstersService } from './monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private monstersService: MonstersService) {}
  @Get('/:monsterName')
  findMonsters(@Param('monsterName') name: string) {
    return this.monstersService.findMonsters(name);
  }
}
