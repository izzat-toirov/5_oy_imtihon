import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchStatusService } from './match_status.service';
import { CreateMatchStatusDto } from './dto/create-match_status.dto';
import { UpdateMatchStatusDto } from './dto/update-match_status.dto';

@Controller('match-status')
export class MatchStatusController {
  constructor(private readonly matchStatusService: MatchStatusService) {}

  @Post()
  create(@Body() createMatchStatusDto: CreateMatchStatusDto) {
    return this.matchStatusService.create(createMatchStatusDto);
  }

  @Get()
  findAll() {
    return this.matchStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchStatusDto: UpdateMatchStatusDto) {
    return this.matchStatusService.update(+id, updateMatchStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchStatusService.remove(+id);
  }
}
