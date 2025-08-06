import { Module } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { InjuriesController } from './injuries.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [InjuriesController],
  providers: [InjuriesService],
  exports: [InjuriesService],
})
export class InjuriesModule {}
