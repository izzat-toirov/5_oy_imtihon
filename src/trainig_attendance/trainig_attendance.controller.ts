import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainigAttendanceService } from './trainig_attendance.service';
import { CreateTrainigAttendanceDto } from './dto/create-trainig_attendance.dto';
import { UpdateTrainigAttendanceDto } from './dto/update-trainig_attendance.dto';

@Controller('trainig-attendance')
export class TrainigAttendanceController {
  constructor(private readonly trainigAttendanceService: TrainigAttendanceService) {}

  @Post()
  create(@Body() createTrainigAttendanceDto: CreateTrainigAttendanceDto) {
    return this.trainigAttendanceService.create(createTrainigAttendanceDto);
  }

  @Get()
  findAll() {
    return this.trainigAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainigAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainigAttendanceDto: UpdateTrainigAttendanceDto) {
    return this.trainigAttendanceService.update(+id, updateTrainigAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainigAttendanceService.remove(+id);
  }
}
