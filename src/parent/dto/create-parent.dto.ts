import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateParentDto {
  @ApiProperty({ example: 10, description: 'User ID (bola yoki foydalanuvchi id)' })
  @IsInt({ message: 'user_id butun son bo‘lishi kerak' })
  user_id: number;

  @ApiProperty({
    example: 'ona',
    description: 'Aloqadorlik (masalan: ona, ota, aka, opa)',
    maxLength: 50,
  })
  @IsString({ message: 'relation matn bo‘lishi kerak' })
  @Length(1, 50, {
    message: 'relation 1 dan 50 belgigacha bo‘lishi kerak',
  })
  relation: string;
}
