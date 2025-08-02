import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    example: 'Paxtakor U-18',
    description: 'Jamoa nomi',
  })
  @IsString({ message: 'name matn ko‘rinishida bo‘lishi kerak' })
  @IsNotEmpty({ message: 'name bo‘sh bo‘lmasligi kerak' })
  name: string;

  @ApiProperty({
    example: 3,
    description: 'Jamoa ustozi (coach) ID raqami',
  })
  @IsInt({ message: 'coach_id butun son bo‘lishi kerak' })
  @Min(1, { message: 'coach_id 1 dan katta bo‘lishi kerak' })
  coach_id: number;

  @ApiProperty({
    example: 'U-18',
    description: 'Yosh toifasi (age group)',
  })
  @IsString({ message: 'age_group matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'age_group bo‘sh bo‘lmasligi kerak' })
  age_group: string;
}
