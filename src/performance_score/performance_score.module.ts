import { Module } from '@nestjs/common';
import { PerformanceScoreService } from './performance_score.service';
import { PerformanceScoreController } from './performance_score.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [PerformanceScoreController],
  providers: [PerformanceScoreService],
  exports: [PerformanceScoreService],
})
export class PerformanceScoreModule {}
