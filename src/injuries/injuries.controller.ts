import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';

@Controller('injuries')
export class InjuriesController {
  constructor(private readonly injuriesService: InjuriesService) {}

  @Post()
  create(@Body() createInjuryDto: CreateInjuryDto) {
    return this.injuriesService.create(createInjuryDto);
  }

  @Get()
  findAll() {
    return this.injuriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injuriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuriesService.update(+id, updateInjuryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuriesService.remove(+id);
  }
}
