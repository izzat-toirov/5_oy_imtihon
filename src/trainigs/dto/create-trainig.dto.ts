import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDateString,
  IsString,
  Length,
} from 'class-validator';

export class CreateTrainigDto {
  @ApiProperty({ example: 1, description: 'Jamoa ID raqami' })
  @IsInt({ message: 'team_id butun son bo‘lishi kerak' })
  team_id: number;

  @ApiProperty({ example: '2025-08-05', description: 'Trening sanasi (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'date noto‘g‘ri formatda, YYYY-MM-DD bo‘lishi kerak' })
  date: string;

  @ApiProperty({ example: '2025-08-05T15:30:00', description: 'Trening vaqti (ISO format)' })
  @IsDateString({}, { message: 'time noto‘g‘ri formatda, ISO formatda bo‘lishi kerak' })
  time: string;

  @ApiProperty({ example: 'Toshkent, Chilonzor sport zali', description: 'Trening manzili' })
  @IsString({ message: 'location matn bo‘lishi kerak' })
  @Length(1, 255, { message: 'location uzunligi 1 dan 255 belgigacha bo‘lishi kerak' })
  location: string;

  @ApiProperty({ example: 'Hujum taktikalari', description: 'Trening mavzusi' })
  @IsString({ message: 'topic matn bo‘lishi kerak' })
  @Length(1, 255, { message: 'topic uzunligi 1 dan 255 belgigacha bo‘lishi kerak' })
  topic: string;
}
