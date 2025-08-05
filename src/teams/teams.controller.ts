import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('teams')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Roles('ADMIN')
  @ApiQuery({ name: 'age_group', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  findAll(
    @Query('age_group') age_group?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.teamsService.findAll({ age_group, limit, offset });
  }

  @Roles('ADMIN', 'COACH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  @Roles('ADMIN', 'COACH')
  @Get(':id/players')
  @ApiOperation({ summary: 'Jamoaning o‘yinchilarini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Team ID' })
  getTeamPlayers(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.getTeamPlayers(id);
  }

  @Roles('ADMIN', 'COACH')
  @Get(':id/matches')
  @ApiOperation({ summary: 'Jamoaning o‘yinlarini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Team ID' })
  getTeamMatches(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.getTeamMatches(id);
  }

  @Roles('ADMIN', 'COACH')
  @Get(':id/trainings')
  @ApiOperation({ summary: 'Jamoaning mashg‘ulotlarini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Team ID' })
  getTeamTrainings(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.getTeamTrainings(id);
  }
}
