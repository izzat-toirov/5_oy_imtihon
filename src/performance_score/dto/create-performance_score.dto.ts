import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDateString,
  IsString,
  Length,
} from 'class-validator';

export class CreatePerformanceScoreDto {
  @ApiProperty({ example: 12, description: 'Oʻyinchi ID raqami' })
  @IsInt({ message: 'player_id butun son bo‘lishi kerak' })
  player_id: number;

  @ApiProperty({ example: 5, description: 'Murabbiy ID raqami' })
  @IsInt({ message: 'coach_id butun son bo‘lishi kerak' })
  coach_id: number;

  @ApiProperty({ example: '2025-08-02', description: 'Natija sanasi (ISO formatda)' })
  @IsDateString({}, { message: 'date noto‘g‘ri formatda, ISO 8601 bo‘lishi kerak' })
  date: string;

  @ApiProperty({ example: 8, description: 'Intizom balli (0-10)' })
  @IsInt({ message: 'discipline butun son bo‘lishi kerak' })
  discipline: number;

  @ApiProperty({ example: 9, description: 'Jismoniy tayyorgarlik balli (0-10)' })
  @IsInt({ message: 'physical butun son bo‘lishi kerak' })
  physical: number;

  @ApiProperty({ example: 7, description: 'Texnika balli (0-10)' })
  @IsInt({ message: 'technique butun son bo‘lishi kerak' })
  technique: number;

  @ApiProperty({ example: 'Yaxshi o‘ynadi, lekin diqqat sust bo‘ldi', description: 'Izohlar (255 belgigacha)' })
  @IsString({ message: 'notes matn bo‘lishi kerak' })
  @Length(0, 255, { message: 'notes uzunligi 255 belgigacha bo‘lishi kerak' })
  notes: string;
}
