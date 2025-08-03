import { Module } from '@nestjs/common';
import { PlayerPhotoService } from './player_photo.service';
import { PlayerPhotoController } from './player_photo.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlayerPhotoController],
  providers: [PlayerPhotoService],
  exports: [PlayerPhotoService],
})
export class PlayerPhotoModule {}
