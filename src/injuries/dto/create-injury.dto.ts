import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInjuryDto {
  @ApiProperty({ example: 5, description: 'Player ID raqami' })
  @IsInt()
  @IsNotEmpty()
  player_id: number;

  @ApiProperty({ example: 'Tizza jarohati', description: 'Jarohat tavsifi' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2025-08-01', description: 'Jarohat olingan sana' })
  @IsDateString()
  @IsNotEmpty()
  injury_date: string;

  @ApiProperty({ example: '2025-08-15', description: 'Tiklanish sanasi' })
  @IsDateString()
  @IsNotEmpty()
  recovery_date: string;
}
