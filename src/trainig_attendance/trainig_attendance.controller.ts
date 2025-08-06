import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TrainigAttendanceService } from './trainig_attendance.service';
import { CreateTrainigAttendanceDto } from './dto/create-trainig_attendance.dto';
import { UpdateTrainigAttendanceDto } from './dto/update-trainig_attendance.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('trainig-attendance')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class TrainigAttendanceController {
  constructor(private readonly trainigAttendanceService: TrainigAttendanceService) {}

  @Roles('ADMIN', 'COACH')
  @Post()
  create(@Body() createTrainigAttendanceDto: CreateTrainigAttendanceDto) {
    return this.trainigAttendanceService.create(createTrainigAttendanceDto);
  }

  @Roles('ADMIN', 'COACH')
  @Get()
  findAll() {
    return this.trainigAttendanceService.findAll();
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainigAttendanceService.findOne(+id);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainigAttendanceDto: UpdateTrainigAttendanceDto) {
    return this.trainigAttendanceService.update(+id, updateTrainigAttendanceDto);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainigAttendanceService.remove(+id);
  }
}
