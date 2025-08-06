import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CoachesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCoachDto: CreateCoachDto) {
    try {
      const { user_id, license_no, experiense } = createCoachDto;
      const numericUserId = Number(user_id);
      const existingUser = await this.prismaService.user.findUnique({
        where: { id: numericUserId },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: user_id = ${numericUserId}`,
        );
      }

      if (existingUser.role !== 'COACH') {
        throw new BadRequestException(
          `Foydalanuvchi COACH roli bilan bog‘liq emas: user_id = ${numericUserId}`,
        );
      }

      const existingCoach = await this.prismaService.coaches.findUnique({
        where: { user_id: numericUserId },
      });

      if (existingCoach) {
        throw new BadRequestException(
          `Ushbu foydalanuvchi allaqachon coach sifatida mavjud`,
        );
      }
      return this.prismaService.coaches.create({
        data: {
          user_id: numericUserId,
          license_no,
          experiense,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: { license_no?: string }) {
    try {
      return await this.prismaService.coaches.findMany({
        where: {
          license_no: filters.license_no
            ? {
                contains: filters.license_no,
                mode: 'insensitive',
              }
            : undefined,
        },
        include: {
          user: true,
          Teams: true,
          Performance_Score: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.coaches.findUnique({
        where: { id },
      });
      if (!user) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateCoachDto: UpdateCoachDto) {
    try {
      return await this.prismaService.coaches.update({
        where: { id },
        data: updateCoachDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.coaches.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.coaches.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
