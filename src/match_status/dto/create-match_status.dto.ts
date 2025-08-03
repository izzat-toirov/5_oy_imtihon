import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchStatusDto {
  @IsInt()
  @ApiProperty({ example: 1 })
  match_id: number;

  @IsInt()
  @ApiProperty({ example: 5 })
  player_id: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 2 })
  goals: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 1 })
  assists: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 0 })
  yellow_cards: number;

  @IsInt()
  @Min(0)
  @ApiProperty({ example: 0 })
  red_cards: number;
}
