import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from '../user/dto/signin-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CookieGetter } from '../common/decorators/cookie-geter.decorator';
import type { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/super_admin.guard';
import { JwtGuard } from '../common/guards/jwt.guard';
import { ResetPasswordDto } from '../user/dto/resetPasswordDto ';
import { ForgotPasswordDto } from '../user/dto/forgot-password.dto.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Roles('SUPER_ADMIN')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(200)
  @Post('signIn')
  signIn(
    @Body() signInUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInUserDto, res);
  }

  @HttpCode(200)
  @Post('signOut')
  signOut(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(refreshToken, res);
  }

  @HttpCode(200)
  @Post('refresh/:id')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh_token(id, refreshToken, res);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPasswordWithConfirm(dto);
  }

  @Post('forgot-password')
async forgotPassword(@Body() dto: ForgotPasswordDto) {
  return this.authService.sendResetPasswordToken(dto.email);
}

}
