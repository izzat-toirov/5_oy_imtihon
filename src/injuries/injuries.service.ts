import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InjuriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateInjuryDto) {
    const player = await this.prismaService.players.findUnique({
      where: { id: dto.player_id },
    });

    if (!player) {
      throw new NotFoundException('Bunday player mavjud emas');
    }
    const injuryDate = new Date(dto.injury_date);
    const recoveryDate = new Date(dto.recovery_date);

    if (injuryDate > recoveryDate) {
      throw new BadRequestException(
        'Jarohat sanasi tiklanish sanasidan oldin bo‘lishi kerak',
      );
    }

    const injury = await this.prismaService.injuries.create({
      data: {
        player_id: dto.player_id,
        description: dto.description,
        injury_date: injuryDate,
        recovery_date: recoveryDate,
      },
    });

    return {
      message: 'Jarohat muvaffaqiyatli qo‘shildi',
      data: injury,
    };
  }

  async findAll() {
    try {
      return await this.prismaService.injuries.findMany({
        include: {
          player: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.injuries.findUnique({
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

  async update(id: number, updateInjuryDto: UpdateInjuryDto) {
    try {
      return await this.prismaService.injuries.update({
        where: { id },
        data: updateInjuryDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.injuries.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.injuries.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
