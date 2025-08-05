import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamPlayerDto } from './dto/create-team_player.dto';
import { UpdateTeamPlayerDto } from './dto/update-team_player.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamPlayersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTeamPlayerDto) {
    try {
      const { team_id, player_id, position } = dto;

      const team = await this.prismaService.teams.findUnique({
        where: { id: team_id },
      });
      if (!team) {
        throw new NotFoundException(`Jamoa topilmadi: team_id = ${team_id}`);
      }

      const player = await this.prismaService.players.findUnique({
        where: { id: player_id },
      });
      if (!player) {
        throw new NotFoundException(
          `Oʻyinchi topilmadi: player_id = ${player_id}`,
        );
      }

      return this.prismaService.team_Players.create({
        data: {
          team_id,
          player_id,
          position,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: { position?: string }) {
    try {
      return await this.prismaService.team_Players.findMany({
        where: {
          position: filters.position ? { contains: filters.position, mode: 'insensitive' } : undefined,
        },
        include: {
          team: true,
          player: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.team_Players.findUnique({
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

  async update(id: number, updateTeamPlayerDto: UpdateTeamPlayerDto) {
    try {
      return await this.prismaService.team_Players.update({
        where: { id },
        data: updateTeamPlayerDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.team_Players.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.team_Players.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
