import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  [x: string]: any;
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: { id: createPlayerDto.user_id },
      });

      if (!userExists) {
        throw new BadRequestException(
          `User ID ${createPlayerDto.user_id} topilmadi`,
        );
      }
      const birthDate = new Date(createPlayerDto.birth_date);

      return this.prismaService.players.create({
        data: {
          user_id: createPlayerDto.user_id,
          birth_date: birthDate,
          position: createPlayerDto.position,
          jersey_no: createPlayerDto.jersey_no,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: { position?: string }) {
    try {
      const players = await this.prismaService.players.findMany({
        where: {
          position: filters.position
            ? { contains: filters.position, mode: 'insensitive' }
            : undefined,
        },
        include: {
          user: true,
        },
      });
      const today = new Date();
      const results = await Promise.all(
        players.map(async (player) => {
          const birthDate = new Date(player.birth_date);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          const fee = await this.prismaService.age_Group_Fess.findFirst({
            where: {
              min_age: { lte: age },
              max_age: { gte: age },
            },
          });
          const monthly_fee = fee ? fee.monthly_fee.toNumber() : 0;

          return {
            ...player,
            age,
            monthly_fee,
          };
        }),
      );

      return results;
    } catch (error) {
      throw new InternalServerErrorException(
        'O‘yinchilarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    try {
      const player = await this.prismaService.players.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
      if (!player) {
        return { error: 'O‘yinchi topilmadi' };
      }
      const today = new Date();
      const birthDate = new Date(player.birth_date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const fee = await this.prismaService.age_Group_Fess.findFirst({
        where: {
          min_age: { lte: age },
          max_age: { gte: age },
        },
      });
      const monthly_fee = fee ? fee.monthly_fee.toNumber() : 0;

      return {
        ...player,
        age,
        monthly_fee,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'O‘yinchini olishda xatolik yuz berdi',
      );
    }
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const player = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!player) {
        throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
      }

      return this.prismaService.players.update({
        where: { id },
        data: {
          ...updatePlayerDto,
          birth_date: updatePlayerDto.birth_date
            ? new Date(updatePlayerDto.birth_date)
            : undefined,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.players.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.players.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async getPlayerPayments(id: number) {
    const player = await this.prismaService.players.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
    }

    const payments = await this.prismaService.payments.findMany({
      where: { player_id: id },
      orderBy: { payment_date: 'desc' },
      select: {
        id: true,
        amount: true,
        payment_date: true,
        method: true,
        status: true,
        reference: true,
        notes: true,
        prelod: true,
        createdAt: true,
        updatedAt: true,
        parent: {
          select: {
            id: true,
            relation: true,
          },
        },
      },
    });

    return payments;
  }

  async getPlayerInjuries(id: number) {
    const player = await this.prismaService.players.findUnique({
      where: { id },
    });

    if (!player) {
      throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
    }

    const injuries = await this.prismaService.injuries.findMany({
      where: { player_id: id },
      orderBy: { injury_date: 'desc' },
      select: {
        id: true,
        description: true,
        injury_date: true,
        recovery_date: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return injuries;
  }

  async createByParent(parentId: number, dto: CreatePlayerDto) {
    const parent = await this.prismaService.parents.findUnique({
      where: { id: parentId },
    });

    if (!parent) {
      throw new NotFoundException('Ota-ona topilmadi');
    }

    const player = await this.prismaService.players.create({
      data: {
        ...dto,
        parent_id: parentId,
      },
    });

    return player;
  }
  
}
