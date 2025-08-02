import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
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
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { ResetPasswordDto } from '../user/dto/resetPasswordDto ';
import { addMinutes } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
    private readonly mailService: MailService,
  ) {}

  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
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
    const { email, password, full_name, phone, role } = createUserDto;
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    if (existingUser) {
      throw new ConflictException('Bunday foydalanuvchi allaqachon mavjud');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activation_link = uuidv4();
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        full_name,
        phone,
        role,
        hashedPassword,
        activation_link,
      },
    });
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.error('Email yuborishda xatolik:', error);
      throw new ServiceUnavailableException(
        'Email yuborishda xatolik yuz berdi',
      );
    }
    return {
      message:
        'Ro‘yxatdan o‘tdingiz. Akkauntni faollashtirish uchun emailni tekshiring.',
    };
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

  async resetPasswordWithConfirm(dto: ResetPasswordDto) {
    const { token, password, confirmPassword } = dto;
    if (!token) throw new BadRequestException('Token topilmadi');
    if (password !== confirmPassword)
      throw new BadRequestException('Parollar mos emas');
  
    const user = await this.prismaService.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpiry: { gt: new Date() },
      },
    });
  
    if (!user) {
      throw new NotFoundException('Token noto‘g‘ri yoki muddati o‘tgan');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });
  
    return { message: 'Parol muvaffaqiyatli o‘zgartirildi' };
  }
  

  async sendResetPasswordToken(email: string) {
    if (!email) {
      throw new NotFoundException('Email manzili kiritilmagan');
    }

    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi topilmadi');
    }

    const token = uuidv4();
    const expiry = addMinutes(new Date(), 15);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: token,
        resetPasswordTokenExpiry: expiry,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.mailService.sendResetPasswordEmail(user, resetUrl); // ❗ Bu metod mavjud bo‘lishi kerak

    return { message: 'Parolni tiklash havolasi emailingizga yuborildi.' };
  }
}
