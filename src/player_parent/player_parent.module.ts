import { Module } from '@nestjs/common';
import { PlayerParentService } from './player_parent.service';
import { PlayerParentController } from './player_parent.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [PlayerParentController],
  providers: [PlayerParentService],
  exports: [PlayerParentService],
})
export class PlayerParentModule {}
