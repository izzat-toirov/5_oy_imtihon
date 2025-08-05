import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findMyTeams(user_id: number) {
    try {
      const coach = await this.prismaService.coaches.findFirst({
        where: { user_id },
        include: { Teams: true },
      });

      if (!coach) {
        throw new NotFoundException(
          `Murabbiy topilmadi (user_id = ${user_id})`,
        );
      }

      return coach.Teams;
    } catch (error) {
      console.error(error); // <-- Bu MUHIM, to‘liq xatolikni ko‘rsatadi
      throw error;
    }
  }
}
