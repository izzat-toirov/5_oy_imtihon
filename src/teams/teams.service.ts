import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    const { name, coach_id, age_group } = createTeamDto;
    const numericUserId = Number(coach_id);
    const existingUser = await this.prismaService.coaches.findUnique({
      where: { id: numericUserId },
    });

    if (!existingUser) {
      throw new NotFoundException(
        `Foydalanuvchi topilmadi: coach_id = ${numericUserId}`,
      );
    }
    return this.prismaService.teams.create({
      data: {
        name,
        coach_id,
        age_group,
      },
    });
  }

  async findAll() {
    try {
      return await this.prismaService.teams.findMany({
        include: {
          coach: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.teams.findUnique({
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

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    try {
      return await this.prismaService.teams.update({
        where: { id },
        data: updateTeamDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    return this.prismaService.teams.delete({ where: { id } });
  }
}
