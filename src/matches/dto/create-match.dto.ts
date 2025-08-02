import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({ example: 1, description: 'Jamoa ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @ApiProperty({ example: 'Barcelona', description: 'Raqib jamoa nomi' })
  @IsString()
  @IsNotEmpty()
  opponent: string;

  @ApiProperty({ example: '2025-08-15', description: 'O‘yin sanasi (ISO format)' })
  @IsDateString()
  @IsNotEmpty()
  match_Date: string;

  @ApiProperty({ example: 'Camp Nou', description: 'O‘yin o‘tkaziladigan joy' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'win', description: 'O‘yin natijasi (masalan: win, lose, draw)' })
  @IsString()
  @IsNotEmpty()
  result: string;
}
