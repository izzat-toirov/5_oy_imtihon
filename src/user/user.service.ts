import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '../../generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSuperAdmin() {
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
        email: 'admin@example.com',
        phone: '+998901112233',
        hashedPassword: await bcrypt.hash('P@ssw0rd123', 10),
        role: Role.SUPER_ADMIN,
        is_active: true,
      },
    });
  
    console.log('✅ Super admin yaratildi');
    return superAdmin;
  }

  async create(createUserDto: CreateUserDto) {
    const { full_name, phone, email, password, confirm_password, role } =
      createUserDto;

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
      throw new BadRequestException('Bu telefon raqami allaqachon ishlatilgan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prismaService.user.create({
      data: {
        full_name,
        phone,
        email,
        hashedPassword,
        is_active: false,
        role,
      },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }
  async updateRefreshToken(id: number, hashedRefreshToken: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new BadRequestException('Foydalanuvchi topilmadi');
    }

    return await this.prismaService.user.update({
      where: { id },
      data: { hashedRefreshToken },
    });
  }

  async findByRole(role: Role) {
    return this.prismaService.user.findMany({
      where: { role },
    });
  }
}
