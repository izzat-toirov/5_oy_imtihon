import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMatchDto: CreateMatchDto) {
    try {
      const { team_id, opponent, match_Date, location, result } = createMatchDto;
    const numericUserId = Number(team_id);
    const existingUser = await this.prismaService.teams.findUnique({
      where: { id: numericUserId },
    });

    if (!existingUser) {
      throw new NotFoundException(
        `Foydalanuvchi topilmadi: team_id = ${numericUserId}`,
      );
    }
    return this.prismaService.matches.create({
      data: {
        team_id,
        opponent,
        match_Date: new Date(createMatchDto.match_Date),
        location,
        result,
      },
    });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.matches.findMany({
        include: {
          team: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.matches.findUnique({
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

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    try {
      return await this.prismaService.matches.update({
        where: { id },
        data: updateMatchDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.matches.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.matches.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
