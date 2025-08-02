import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateTrainigAttendanceDto {
  @ApiProperty({ example: 3, description: 'Trening ID raqami' })
  @IsInt({ message: 'trainig_id butun son bo‘lishi kerak' })
  trainig_id: number;

  @ApiProperty({ example: 8, description: 'Oʻyinchi ID raqami' })
  @IsInt({ message: 'player_id butun son bo‘lishi kerak' })
  player_id: number;

  @ApiProperty({
    example: 'kelgan',
    description: 'Treningga qatnashish holati (masalan: kelgan, kelmagan, kech qolgan)',
    maxLength: 30,
  })
  @IsString({ message: 'status matn bo‘lishi kerak' })
  @Length(1, 30, { message: 'status 1 dan 30 belgigacha bo‘lishi kerak' })
  status: string;
}
