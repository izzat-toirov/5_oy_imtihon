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

@Controller('coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createCoachDto: CreateCoachDto) {
    return this.coachesService.create(createCoachDto);
  }

  @ApiQuery({ name: 'license_no', required: false })
  @Get()
  findAll(@Query('license_no') license_no?: string) {
    return this.coachesService.findAll({ license_no });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachesService.update(+id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachesService.remove(+id);
  }

  @ApiBearerAuth()
  @Roles('COACH')
  @UseGuards(JwtGuard, RolesGuard)
  @Get('my-players')
  getMyPlayers(@Req() req: Request) {
    return this.coachesService.findMyPlayers(req.user.id);
  }
}
