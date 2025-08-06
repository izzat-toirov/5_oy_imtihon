import { Module } from '@nestjs/common';
import { TrainigAttendanceService } from './trainig_attendance.service';
import { TrainigAttendanceController } from './trainig_attendance.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [TrainigAttendanceController],
  providers: [TrainigAttendanceService],
  exports: [TrainigAttendanceService],
})
export class TrainigAttendanceModule {}
