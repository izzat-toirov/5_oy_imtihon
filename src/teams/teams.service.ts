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

  // GET /teams/:id/players
  async getTeamPlayers(id: number) {
    const team = await this.prismaService.teams.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Jamoa topilmadi: id = ${id}`);
    }

    const teamPlayers = await this.prismaService.team_Players.findMany({
      where: { team_id: id },
      include: {
        player: {
          include: { user: true },
        },
      },
    });

    return teamPlayers.map((tp) => ({
      id: tp.player.id,
      position: tp.position,
      jersey_no: tp.player.jersey_no,
      birth_date: tp.player.birth_date,
      user: tp.player.user,
    }));
  }

  // GET /teams/:id/matches
  async getTeamMatches(id: number) {
    const team = await this.prismaService.teams.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Jamoa topilmadi: id = ${id}`);
    }

    return this.prismaService.matches.findMany({
      where: { team_id: id },
      orderBy: { match_Date: 'desc' },
    });
  }

  // GET /teams/:id/trainings
  async getTeamTrainings(id: number) {
    const team = await this.prismaService.teams.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException(`Jamoa topilmadi: id = ${id}`);
    }

    return this.prismaService.trainigs.findMany({
      where: { team_id: id },
      orderBy: { date: 'desc' },
    });
  }
}
