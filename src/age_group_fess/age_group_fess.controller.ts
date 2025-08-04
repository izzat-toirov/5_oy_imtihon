import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgeGroupFessService } from './age_group_fess.service';
import { CreateAgeGroupFessDto } from './dto/create-age_group_fess.dto';
import { UpdateAgeGroupFessDto } from './dto/update-age_group_fess.dto';

@Controller('age-group-fess')
export class AgeGroupFessController {
  constructor(private readonly ageGroupFessService: AgeGroupFessService) {}

  @Post()
  create(@Body() createAgeGroupFessDto: CreateAgeGroupFessDto) {
    return this.ageGroupFessService.create(createAgeGroupFessDto);
  }

  @Get()
  findAll() {
    return this.ageGroupFessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ageGroupFessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgeGroupFessDto: UpdateAgeGroupFessDto) {
    return this.ageGroupFessService.update(+id, updateAgeGroupFessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ageGroupFessService.remove(+id);
  }
}
