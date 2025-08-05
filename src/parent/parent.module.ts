import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PlayersModule } from '../players/players.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, PlayersModule, JwtModule],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule {}
