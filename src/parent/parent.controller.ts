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
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('parent')
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @Post()
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }

  @ApiQuery({ name: 'relation', required: false })
  @Get()
  findAll(@Query('relation') relation?: string) {
    return this.parentService.findAll({ relation });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }
}
