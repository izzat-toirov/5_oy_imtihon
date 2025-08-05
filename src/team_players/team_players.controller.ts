import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamPlayersService } from './team_players.service';
import { CreateTeamPlayerDto } from './dto/create-team_player.dto';
import { UpdateTeamPlayerDto } from './dto/update-team_player.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('team-players')
export class TeamPlayersController {
  constructor(private readonly teamPlayersService: TeamPlayersService) {}

  @Post()
  create(@Body() createTeamPlayerDto: CreateTeamPlayerDto) {
    return this.teamPlayersService.create(createTeamPlayerDto);
  }

  @ApiQuery({ name: 'position', required: false })
  @Get()
  findAll(@Query('position') position?: string) {
    return this.teamPlayersService.findAll({ position });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamPlayersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamPlayerDto: UpdateTeamPlayerDto,
  ) {
    return this.teamPlayersService.update(+id, updateTeamPlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamPlayersService.remove(+id);
  }
}
