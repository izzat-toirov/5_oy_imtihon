import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TeamPlayersService } from './team_players.service';
import { CreateTeamPlayerDto } from './dto/create-team_player.dto';
import { UpdateTeamPlayerDto } from './dto/update-team_player.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtGuard } from '../common/guards/jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('team-players')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class TeamPlayersController {
  constructor(private readonly teamPlayersService: TeamPlayersService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createTeamPlayerDto: CreateTeamPlayerDto) {
    return this.teamPlayersService.create(createTeamPlayerDto);
  }

  @Roles('ADMIN', 'COACH')
  @ApiQuery({ name: 'position', required: false })
  @Get()
  findAll(@Query('position') position?: string) {
    return this.teamPlayersService.findAll({ position });
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamPlayersService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamPlayerDto: UpdateTeamPlayerDto,
  ) {
    return this.teamPlayersService.update(+id, updateTeamPlayerDto);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamPlayersService.remove(+id);
  }
}
