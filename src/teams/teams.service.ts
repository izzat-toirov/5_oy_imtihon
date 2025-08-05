import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
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
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: {
    age_group?: string;
    limit?: string;
    offset?: string;
  }) {
    try {
      const take = filters.limit ? parseInt(filters.limit) : 10;
      const skip = filters.offset ? parseInt(filters.offset) : 0;

      return await this.prismaService.teams.findMany({
        where: {
          age_group: filters.age_group
            ? { contains: filters.age_group, mode: 'insensitive' }
            : undefined,
        },
        include: {
          coach: true,
        },
        take,
        skip,
      });
    } catch (error) {
      throw error;
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
    try {
      const existingUser = await this.prismaService.teams.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.teams.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
