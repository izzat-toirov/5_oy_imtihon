import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerformanceScoreDto } from './dto/create-performance_score.dto';
import { UpdatePerformanceScoreDto } from './dto/update-performance_score.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PerformanceScoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPerformanceScoreDto: CreatePerformanceScoreDto) {
    try {
      const {
        player_id,
        coach_id,
        date,
        discipline,
        physical,
        technique,
        notes,
      } = createPerformanceScoreDto;
  
      const numericPlayerId = Number(player_id);
      const numericCoachId = Number(coach_id);
  
      const existingPlayer = await this.prismaService.players.findUnique({
        where: { id: numericPlayerId },
      });
  
      if (!existingPlayer) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: player_id = ${numericPlayerId}`,
        );
      }
  
      const existingCoach = await this.prismaService.coaches.findUnique({
        where: { id: numericCoachId },
      });
  
      if (!existingCoach) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: coach_id = ${numericCoachId}`,
        );
      }
  
      const newPerformance = await this.prismaService.performance_Score.create({
        data: {
          player_id: numericPlayerId,
          coach_id: numericCoachId,
          date: new Date(date),
          discipline,
          physical,
          technique,
          notes,
        },
      });
  
      return newPerformance;
    } catch (error) {
      throw error;
    }
  }
  

  async findAll() {
    try {
      return await this.prismaService.performance_Score.findMany({
        include: {
          player: true,
          coach: true
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.performance_Score.findUnique({
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

  async update(id: number, updatePerformanceScoreDto: UpdatePerformanceScoreDto) {
    try {
      return await this.prismaService.performance_Score.update({
        where: { id },
        data: updatePerformanceScoreDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.performance_Score.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.performance_Score.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
