import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainigsService } from './trainigs.service';
import { CreateTrainigDto } from './dto/create-trainig.dto';
import { UpdateTrainigDto } from './dto/update-trainig.dto';

@Controller('trainigs')
export class TrainigsController {
  constructor(private readonly trainigsService: TrainigsService) {}

  @Post()
  create(@Body() createTrainigDto: CreateTrainigDto) {
    return this.trainigsService.create(createTrainigDto);
  }

  @Get()
  findAll() {
    return this.trainigsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainigDto: UpdateTrainigDto) {
    return this.trainigsService.update(+id, updateTrainigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainigsService.remove(+id);
  }
}
