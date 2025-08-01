import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SigninUserDto } from '../user/dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const { email } = createUserDto;
      const candidate = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (candidate) {
        throw new ConflictException('Bunday foydalanuvchi allaqachon mavjud');
      }

      const newUser = await this.usersService.createAdmin(createUserDto);
      return {
        message: 'Yangi foydalanuvchi muvaffaqiyatli yaratildi',
        userId: newUser.id,
      };
    } catch (error) {
      return error;
    }
  }

  async signIn(signInUserDto: SigninUserDto, res: Response) {
    try {
      const { email, password, confirm_password } = signInUserDto;
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Bunday foydalanuvchi mavjud emas');
      }

      if (password !== confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }

      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
      }

      const { accessToken, refreshToken } = await this.generateTokens(user);

      const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

      await this.prismaService.user.update({
        where: { id: user.id },
        data: { hashedRefreshToken },
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: Number(process.env.COOKIE_TIME) || 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return {
        message: 'Foydalanuvchi tizimga kirdi',
        userId: user.id,
        accessToken,
      };
    } catch (error) {
      return error;
    }
  }

  async signOut(refreshToken: string, res: Response) {
    try {
      let userData: any;
      try {
        userData = await this.jwtService.verify(refreshToken, {
          secret: process.env.REFRESH_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error);
      }
      if (!userData) {
        throw new ForbiddenException('User not found');
      }
      await this.usersService.updateRefreshToken(userData.id, '');

      res.clearCookie('refreshToken');
      return {
        message: 'User logged out successfuly',
      };
    } catch (error) {
      return error;
    }
  }

  async refresh_token(userId: number, refreshToken: string, res: Response) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });
      if (!user || !user.hashedRefreshToken || !user.hashedRefreshToken)
        throw new UnauthorizedException('User topilmadi');

      const rtMatches = await bcrypt.compare(
        refreshToken,
        user.hashedRefreshToken,
      );

      if (!rtMatches)
        throw new UnauthorizedException('Refresh token noto‘g‘ri');

      const tokens = await this.generateTokens(user);
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
      await this.prismaService.user.update({
        where: { id: userId },
        data: { hashedRefreshToken },
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: +process.env.COOKIE_TIME!,
        httpOnly: true,
      });

      return {
        message: 'tokenlar yangilandi',
        userId: user.id,
        accessToken: tokens.accessToken,
      };
    } catch (error) {
      return error;
    }
  }
}
