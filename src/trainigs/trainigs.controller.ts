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
import { TrainigsService } from './trainigs.service';
import { CreateTrainigDto } from './dto/create-trainig.dto';
import { UpdateTrainigDto } from './dto/update-trainig.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('trainigs')
export class TrainigsController {
  constructor(private readonly trainigsService: TrainigsService) {}

  @Post()
  create(@Body() createTrainigDto: CreateTrainigDto) {
    return this.trainigsService.create(createTrainigDto);
  }

  @ApiQuery({ name: 'location', required: false })
  @Get()
  findAll(@Query('location') location?: string) {
    return this.trainigsService.findAll({ location });
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
