import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  Length,
  Matches,
} from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COACH = 'COACH',
  SUPER_ADMIN = 'SUPER_ADMIN',
  PLAYER = 'PLAYER',
  PARENT = 'PARENT'
}

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Foydalanuvchining to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqami +998 bilan boshlanib, 9 raqamdan iborat bo‘lishi kerak',
  })
  phone?: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email manzili' })
  @IsEmail({}, { message: 'Email noto‘g‘ri kiritilgan' })
  email: string;

  @ApiProperty({ example: 'MySecureP@ss1', description: 'Parol' })
  @IsString()
  @Length(8, 32, { message: 'Parol uzunligi 8 dan 32 gacha bo‘lishi kerak' })
  password: string;

  @ApiProperty({ example: 'MySecureP@ss1', description: 'Parolni tasdiqlash' })
  @IsString()
  @Length(8, 32, { message: 'Parol uzunligi 8 dan 32 gacha bo‘lishi kerak' })
  confirm_password: string;

  @ApiProperty({ enum: Role, example: Role.USER })
  @IsEnum(Role)
  role: Role;
}
