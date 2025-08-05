import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../../generated/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSuperAdmin() {
    try {
      const existingSuperAdmins = await this.prismaService.user.findMany({
        where: { role: Role.SUPER_ADMIN },
      });

      if (existingSuperAdmins.length > 0) {
        console.log('❗ Super admin allaqachon mavjud');
        return existingSuperAdmins[0];
      }
      const superAdmin = await this.prismaService.user.create({
        data: {
          full_name: 'Super Admin',
          email: 'superAdmin@gmail.com',
          phone: '+998901112233',
          hashedPassword: await bcrypt.hash('MySecureP@ss1', 10),
          role: Role.SUPER_ADMIN,
          is_active: true,
          activation_link: uuidv4(),
        },
      });

      console.log('✅ Super admin yaratildi');
      return superAdmin;
    } catch (error) {
      return error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const {
        full_name,
        phone,
        email,
        password,
        confirm_password,
        role = Role.PARENT,
      } = createUserDto;

      if (role !== Role.PARENT) {
        throw new BadRequestException(
          'Faqat PARENT roli bilan foydalanuvchi yaratish mumkin',
        );
      }

      if (password !== confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }

      const existingEmail = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        throw new BadRequestException(
          'Bu email bilan foydalanuvchi allaqachon mavjud',
        );
      }

      const existingPhone = await this.prismaService.user.findUnique({
        where: { phone },
      });
      if (existingPhone) {
        throw new BadRequestException(
          'Bu telefon raqami allaqachon ishlatilgan',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const activation_link = uuidv4();

      return this.prismaService.user.create({
        data: {
          full_name,
          phone,
          email,
          hashedPassword,
          is_active: false,
          role: Role.PARENT,
          activation_link,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Foydalanuvchi yaratishda xatolik',
      );
    }
  }

  async findAll(filter: { full_name?: string; role?: string }) {
    try {
      const where: any = {};
  
      if (filter.full_name) {
        where.full_name = {
          contains: filter.full_name,
          mode: 'insensitive',
        };
      }
  
      if (filter.role) {
        where.role = filter.role;
      }
  
      return await this.prismaService.user.findMany({ where });
    } catch (error) {
      throw new InternalServerErrorException('Foydalanuvchilarni olishda xatolik yuz berdi');
    }
  }
  

  async findOne(id: number) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.user.findUnique({ where: { id } });
  
    if (!existingUser) {
      return { error: 'Foydalanuvchi topilmadi' };
    }
    return await this.prismaService.user.delete({ where: { id } });
    } catch (error) {
     return error; 
    }
  
  }
  

  async updateRefreshToken(id: number, hashedRefreshToken: string) {
    try {
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        throw new BadRequestException('Foydalanuvchi topilmadi');
      }

      return await this.prismaService.user.update({
        where: { id },
        data: { hashedRefreshToken },
      });
    } catch (error) {
      return error;
    }
  }

  async findByRole(role: Role) {
    try {
      return this.prismaService.user.findMany({
        where: { role },
      });
    } catch (error) {
      return error;
    }
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        activation_link: link,
        is_active: false,
      },
    });

    if (!user) {
      throw new BadRequestException('User already activated or link invalid');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return {
      message: 'User activated successfully',
      is_active: updatedUser.is_active,
    };
  }
}
