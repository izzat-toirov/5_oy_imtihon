import { Module } from '@nestjs/common';
import { MatchStatusService } from './match_status.service';
import { MatchStatusController } from './match_status.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [MatchStatusController],
  providers: [MatchStatusService],
  exports: [MatchStatusService],
})
export class MatchStatusModule {}
