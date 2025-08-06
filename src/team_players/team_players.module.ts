import { Module } from '@nestjs/common';
import { TeamPlayersService } from './team_players.service';
import { TeamPlayersController } from './team_players.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TeamPlayersController],
  providers: [TeamPlayersService],
  exports: [TeamPlayersService],
})
export class TeamPlayersModule {}
