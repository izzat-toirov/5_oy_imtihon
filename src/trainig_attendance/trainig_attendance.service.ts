import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainigAttendanceDto } from './dto/create-trainig_attendance.dto';
import { UpdateTrainigAttendanceDto } from './dto/update-trainig_attendance.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainigAttendanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTrainigAttendanceDto) {
    const { trainig_id, player_id, status } = dto;
  
    const trainig = await this.prismaService.trainigs.findUnique({ where: { id: trainig_id } });
    if (!trainig) {
      throw new NotFoundException(`Trening topilmadi: trainig_id = ${trainig_id}`);
    }
  
    const player = await this.prismaService.players.findUnique({ where: { id: player_id } });
    if (!player) {
      throw new NotFoundException(`Oʻyinchi topilmadi: player_id = ${player_id}`);
    }
  
    return this.prismaService.trainig_Attendance.create({
      data: {
        trainig_id,
        player_id,
        status,
      },
    });
  }
  

  async findAll() {
    try {
      return await this.prismaService.trainig_Attendance.findMany({
        include: {
          trainig: true,
          player: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.trainig_Attendance.findUnique({
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

  async update(id: number, updateTrainigAttendanceDto: UpdateTrainigAttendanceDto) {
    try {
      return await this.prismaService.trainig_Attendance.update({
        where: { id },
        data: updateTrainigAttendanceDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.trainig_Attendance.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.trainig_Attendance.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
