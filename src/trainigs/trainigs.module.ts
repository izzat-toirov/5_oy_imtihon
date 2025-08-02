import { Module } from '@nestjs/common';
import { TrainigsService } from './trainigs.service';
import { TrainigsController } from './trainigs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TrainigsController],
  providers: [TrainigsService],
  exports: [TrainigsService],
})
export class TrainigsModule {}
