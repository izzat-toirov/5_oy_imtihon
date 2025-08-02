import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoachesModule } from './coaches/coaches.module';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { TrainigsModule } from './trainigs/trainigs.module';
import { PerformanceScoreModule } from './performance_score/performance_score.module';
import { ParentModule } from './parent/parent.module';
import { PlayerParentModule } from './player_parent/player_parent.module';
import { TeamPlayersModule } from './team_players/team_players.module';
import { TrainigAttendanceModule } from './trainig_attendance/trainig_attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file',
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    PlayersModule,
    CoachesModule,
    TeamsModule,
    MatchesModule,
    TrainigsModule,
    PerformanceScoreModule,
    ParentModule,
    PlayerParentModule,
    TeamPlayersModule,
    TrainigAttendanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
