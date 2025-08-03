import { IsBoolean, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi IDsi',
  })
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 'Yangi bildirishnoma',
    description: 'Bildirishnoma sarlavhasi',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  title: string;

  @ApiProperty({
    example: 'Profilingiz muvaffaqiyatli yangilandi',
    description: 'Bildirishnoma matni',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  message: string;

  @ApiProperty({
    example: false,
    description: 'O‘qilgan yoki yo‘qligi (true — o‘qilgan, false — o‘qilmagan)',
  })
  @IsBoolean()
  is_read: boolean;
}
