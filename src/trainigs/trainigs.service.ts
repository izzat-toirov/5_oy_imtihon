import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrainigDto } from './dto/update-trainig.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainigDto } from './dto/create-trainig.dto';

@Injectable()
export class TrainigsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrainingDto: CreateTrainigDto) {
    try {
      const { team_id, date, time, location, topic } = createTrainingDto;
      const numericUserId = Number(team_id);
      const existingUser = await this.prismaService.teams.findUnique({
        where: { id: numericUserId },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: team_id = ${numericUserId}`,
        );
      }
      return this.prismaService.trainigs.create({
        data: {
          team_id: numericUserId,
          date: new Date(),
          time: new Date(),
          location,
          topic,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: { location?: string }) {
    try {
      return await this.prismaService.trainigs.findMany({
        where: {
          location: filters.location ? { contains: filters.location, mode: 'insensitive' } : undefined,
        },
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
      const user = await this.prismaService.trainigs.findUnique({
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

  async update(id: number, updateTrainigDto: UpdateTrainigDto) {
    try {
      return await this.prismaService.trainigs.update({
        where: { id },
        data: updateTrainigDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.trainigs.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.trainigs.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
