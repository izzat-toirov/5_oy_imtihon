import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 1, description: 'User ID (foreign key)' })
  @Type(()=> Number)
  @IsInt()
  user_id: number;

  @ApiProperty({ example: '2005-05-20', description: 'Tug‘ilgan sana (ISO format)' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'birth_date noto‘g‘ri sana formatida' })
  birth_date: Date;

  @ApiProperty({ example: 'Forward', description: 'Pozitsiya', maxLength: 50 })
  @IsString()
  @MaxLength(50)
  position: string;

  @ApiProperty({ example: 10, description: 'Forma raqami (butun son)' })
  @Type(()=> Number)
  @IsInt()
  jersey_no: number;

}
