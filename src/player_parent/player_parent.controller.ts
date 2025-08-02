import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerParentService } from './player_parent.service';
import { CreatePlayerParentDto } from './dto/create-player_parent.dto';
import { UpdatePlayerParentDto } from './dto/update-player_parent.dto';

@Controller('player-parent')
export class PlayerParentController {
  constructor(private readonly playerParentService: PlayerParentService) {}

  @Post()
  create(@Body() createPlayerParentDto: CreatePlayerParentDto) {
    return this.playerParentService.create(createPlayerParentDto);
  }

  @Get()
  findAll() {
    return this.playerParentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerParentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerParentDto: UpdatePlayerParentDto) {
    return this.playerParentService.update(+id, updatePlayerParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerParentService.remove(+id);
  }
}
