import { Module } from '@nestjs/common';
import { PlayerParentService } from './player_parent.service';
import { PlayerParentController } from './player_parent.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule],
  controllers: [PlayerParentController],
  providers: [PlayerParentService],
  exports: [PlayerParentService],
})
export class PlayerParentModule {}
