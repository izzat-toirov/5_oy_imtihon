import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchStatusDto } from './dto/create-match_status.dto';
import { UpdateMatchStatusDto } from './dto/update-match_status.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateMatchStatusDto) {
    try {
      const { match_id, player_id, goals, assists, yellow_cards, red_cards } =
        dto;

      const team = await this.prismaService.matches.findUnique({
        where: { id: match_id },
      });
      if (!team) {
        throw new NotFoundException(`Jamoa topilmadi: match_id = ${match_id}`);
      }

      const player = await this.prismaService.players.findUnique({
        where: { id: player_id },
      });
      if (!player) {
        throw new NotFoundException(
          `Oʻyinchi topilmadi: player_id = ${player_id}`,
        );
      }

      return this.prismaService.match_Status.create({
        data: {
          match_id,
          player_id,
          goals,
          assists,
          yellow_cards,
          red_cards,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(filters: { limit?: string; offset?: string }) {
    try {
      const take = filters.limit ? parseInt(filters.limit) : 10;
      const skip = filters.offset ? parseInt(filters.offset) : 0;
      return await this.prismaService.match_Status.findMany({
        include: {
          match: true,
          player: true,
        },
        take,
        skip,
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.match_Status.findUnique({
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

  async update(id: number, updateMatchStatusDto: UpdateMatchStatusDto) {
    try {
      return await this.prismaService.match_Status.update({
        where: { id },
        data: updateMatchStatusDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.match_Status.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.match_Status.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
