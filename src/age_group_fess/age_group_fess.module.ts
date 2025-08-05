import { Module } from '@nestjs/common';
import { AgeGroupFessService } from './age_group_fess.service';
import { AgeGroupFessController } from './age_group_fess.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [AgeGroupFessController],
  providers: [AgeGroupFessService],
  exports: [AgeGroupFessService],
})
export class AgeGroupFessModule {}
