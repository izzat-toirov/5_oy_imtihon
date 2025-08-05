import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Parent ID' })
  @IsInt()
  parent_id: number;

  @ApiProperty({ example: 5, description: 'Player ID' })
  @IsInt()
  player_id: number;

  @ApiProperty({ example: 250000.50, description: 'To‘lov summasi' })
  @IsNumber({}, { message: 'amount is not a valid decimal number.' })
  amount: number;

  @ApiProperty({ example: '2025-08-03T00:00:00.000Z', description: 'To‘lov sanasi' })
  @IsDateString()
  payment_date: string;

  @ApiProperty({ example: 'Naqd', description: 'To‘lov usuli' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  method: string;

  @ApiProperty({ example: 'Oldindan', description: 'To‘lov turi' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  prelod: string;

  @ApiProperty({ example: 'To‘landi', description: 'Holat' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;

  @ApiProperty({ example: 'TXN123456789', description: 'To‘lov raqami yoki izohi' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reference: string;

  @ApiProperty({ example: '2025 yil uchun avans to‘landi', description: 'Izohlar' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  notes: string;
}
