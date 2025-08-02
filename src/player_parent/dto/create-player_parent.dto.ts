import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreatePlayerParentDto {
  @ApiProperty({ example: 7, description: 'Oʻyinchi ID raqami' })
  @IsInt({ message: 'player_id butun son bo‘lishi kerak' })
  player_id: number;

  @ApiProperty({ example: 3, description: 'Ota-ona ID raqami' })
  @IsInt({ message: 'parent_id butun son bo‘lishi kerak' })
  parent_id: number;
}
