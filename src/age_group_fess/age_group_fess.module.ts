import { Module } from '@nestjs/common';
import { AgeGroupFessService } from './age_group_fess.service';
import { AgeGroupFessController } from './age_group_fess.controller';

@Module({
  controllers: [AgeGroupFessController],
  providers: [AgeGroupFessService],
})
export class AgeGroupFessModule {}
