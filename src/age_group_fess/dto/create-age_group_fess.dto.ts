import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsNumber,
  Min,
  Length,
} from 'class-validator';

export class CreateAgeGroupFessDto {
  @ApiProperty({
    example: 'Teen',
    description: 'Yosh guruhi nomi',
    maxLength: 10,
  })
  @IsString({ message: 'age_group matn bo‘lishi kerak' })
  @Length(1, 10, { message: 'age_group uzunligi 1 dan 10 gacha bo‘lishi kerak' })
  age_group: string;

  @ApiProperty({
    example: 13,
    description: 'Minimal yosh',
  })
  @IsInt({ message: 'min_age butun son bo‘lishi kerak' })
  @Min(0, { message: 'min_age 0 dan kichik bo‘lmasligi kerak' })
  min_age: number;

  @ApiProperty({
    example: 19,
    description: 'Maksimal yosh',
  })
  @IsInt({ message: 'max_age butun son bo‘lishi kerak' })
  @Min(0, { message: 'max_age 0 dan kichik bo‘lmasligi kerak' })
  max_age: number;

  @ApiProperty({
    example: 250000,
    description: 'Oylik to‘lov',
  })
  @IsNumber({}, { message: 'monthly_fee raqam bo‘lishi kerak' })
  @Min(0, { message: 'monthly_fee 0 dan kichik bo‘lmasligi kerak' })
  monthly_fee: number;
}
