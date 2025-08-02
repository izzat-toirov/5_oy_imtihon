import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerformanceScoreService } from './performance_score.service';
import { CreatePerformanceScoreDto } from './dto/create-performance_score.dto';
import { UpdatePerformanceScoreDto } from './dto/update-performance_score.dto';

@Controller('performance-score')
export class PerformanceScoreController {
  constructor(private readonly performanceScoreService: PerformanceScoreService) {}

  @Post()
  create(@Body() createPerformanceScoreDto: CreatePerformanceScoreDto) {
    return this.performanceScoreService.create(createPerformanceScoreDto);
  }

  @Get()
  findAll() {
    return this.performanceScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceScoreDto: UpdatePerformanceScoreDto) {
    return this.performanceScoreService.update(+id, updatePerformanceScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceScoreService.remove(+id);
  }
}
