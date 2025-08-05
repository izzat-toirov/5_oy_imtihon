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
  Req,
} from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import type { Request } from 'express';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('coaches')
@ApiBearerAuth()
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.create(createCoachDto);
  }

  @Roles('ADMIN')
  @ApiQuery({ name: 'license_no', required: false })
  @Get()
  findAll(@Query('license_no') license_no?: string) {
    return this.coachesService.findAll({ license_no });
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachesService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachesService.update(+id, updateCoachDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachesService.remove(+id);
  }

  @Roles('COACH')
  @Get('my-teams')
  @ApiQuery({ name: 'user_id', required: true, type: Number })
  findMyTeams(@Query('user_id') user_id: string) {
    return this.coachesService.findMyTeams(Number(user_id));
  }
  
}
