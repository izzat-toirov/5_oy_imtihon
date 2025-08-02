import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCoachDto {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchining ID raqami',
  })
  @IsInt({ message: 'user_id butun son bo‘lishi kerak' })
  @Min(1, { message: 'user_id 1 dan katta bo‘lishi kerak' })
  user_id: number;

  @ApiProperty({
    example: 'ABC123456',
    description: 'Murabbiyning litsenziya raqami',
  })
  @IsString({ message: 'license_no matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'license_no bo‘sh bo‘lmasligi kerak' })
  license_no: string;

  @ApiProperty({
    example: '5 yil tajriba',
    description: 'Murabbiyning tajribasi',
  })
  @IsString({ message: 'experiense matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'experiense bo‘sh bo‘lmasligi kerak' })
  experiense: string;
}
