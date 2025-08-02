import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoachesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCoachDto: CreateCoachDto) {
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
  }

  async findAll() {
    try {
      return await this.prismaService.players.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      return error;
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
    return this.prismaService.coaches.delete({ where: { id } });
  }
}
