import { Controller, Get } from '@nestjs/common';
import { MonstersService } from './monsters.service';

@Controller('monsters')
export class MonstersController {
  constructor(private monstersService: MonstersService) {}

  @Get()
  findMonsters() {
    return this.monstersService.findMonsters();
  }
}
