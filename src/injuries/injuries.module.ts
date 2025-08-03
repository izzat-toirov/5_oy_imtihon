import { Module } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { InjuriesController } from './injuries.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService],
})
export class InjuriesModule {}
