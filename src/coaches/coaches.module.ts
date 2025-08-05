import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesController } from './coaches.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CoachesController],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}
