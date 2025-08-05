import { Module } from '@nestjs/common';
import { TrainigsService } from './trainigs.service';
import { TrainigsController } from './trainigs.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [TrainigsController],
  providers: [TrainigsService],
  exports: [TrainigsService],
})
export class TrainigsModule {}
