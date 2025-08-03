import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePlayerPhotoDto {
  @ApiProperty({ example: 1, description: "O'yinchining ID raqami" })
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  player_id: number;

}
