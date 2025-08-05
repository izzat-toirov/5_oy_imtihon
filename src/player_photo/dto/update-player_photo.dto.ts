import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePlayerPhotoDto } from './create-player_photo.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdatePlayerPhotoDto extends PartialType(CreatePlayerPhotoDto) {
  @ApiPropertyOptional({ example: 1, description: 'O‘yinchi ID raqami' })
  @IsOptional()
  @IsInt({ message: 'player_id butun son bo‘lishi kerak' })
  player_id?: number;
}
