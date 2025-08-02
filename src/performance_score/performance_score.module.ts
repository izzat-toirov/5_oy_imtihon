import { Module } from '@nestjs/common';
import { PerformanceScoreService } from './performance_score.service';
import { PerformanceScoreController } from './performance_score.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceScoreController],
  providers: [PerformanceScoreService],
  exports: [PerformanceScoreService],
})
export class PerformanceScoreModule {}
