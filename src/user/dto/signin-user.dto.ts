import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SigninUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @ApiProperty()
  @IsString()
  readonly email: string;
  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsString()
  readonly password: string;
}
