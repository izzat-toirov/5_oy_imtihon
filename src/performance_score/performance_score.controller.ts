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
import { PerformanceScoreService } from './performance_score.service';
import { CreatePerformanceScoreDto } from './dto/create-performance_score.dto';
import { UpdatePerformanceScoreDto } from './dto/update-performance_score.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import type { Request } from 'express';

@Controller('performance-score')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class PerformanceScoreController {
  constructor(
    private readonly performanceScoreService: PerformanceScoreService,
  ) {}

  @Roles('ADMIN', 'COACH')
  @Post()
  create(@Body() createPerformanceScoreDto: CreatePerformanceScoreDto) {
    return this.performanceScoreService.create(createPerformanceScoreDto);
  }

  @Roles('ADMIN', 'COACH')
  @ApiQuery({ name: 'notes', required: false })
  @Get()
  findAll(@Query('notes') notes?: string) {
    return this.performanceScoreService.findAll({ notes });
  }

  @Roles('ADMIN', 'COACH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceScoreService.findOne(+id);
  }

  @Roles('ADMIN', 'COACH')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerformanceScoreDto: UpdatePerformanceScoreDto,
  ) {
    return this.performanceScoreService.update(+id, updatePerformanceScoreDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceScoreService.remove(+id);
  }

}
