import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PlayerParentService } from './player_parent.service';
import { CreatePlayerParentDto } from './dto/create-player_parent.dto';
import { UpdatePlayerParentDto } from './dto/update-player_parent.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtGuard } from '../common/guards/jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('player-parent')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class PlayerParentController {
  constructor(private readonly playerParentService: PlayerParentService) {}

  @Roles('ADMIN', 'COACH')
  @Post()
  create(@Body() createPlayerParentDto: CreatePlayerParentDto) {
    return this.playerParentService.create(createPlayerParentDto);
  }

  @Roles('ADMIN', 'COACH')
  @Get()
  findAll() {
    return this.playerParentService.findAll();
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerParentService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerParentDto: UpdatePlayerParentDto) {
    return this.playerParentService.update(+id, updatePlayerParentDto);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerParentService.remove(+id);
  }
}
