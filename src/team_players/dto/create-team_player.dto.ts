import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateTeamPlayerDto {
  @ApiProperty({ example: 1, description: 'Jamoa ID raqami' })
  @IsInt({ message: 'team_id butun son bo‘lishi kerak' })
  team_id: number;

  @ApiProperty({ example: 5, description: 'Oʻyinchi ID raqami' })
  @IsInt({ message: 'player_id butun son bo‘lishi kerak' })
  player_id: number;

  @ApiProperty({ example: 'Himoyachi', description: 'Oʻyinchining jamoadagi pozitsiyasi (maks. 30 belgi)' })
  @IsString({ message: 'position matn bo‘lishi kerak' })
  @Length(1, 30, { message: 'position uzunligi 1 dan 30 belgigacha bo‘lishi kerak' })
  position: string;
}
