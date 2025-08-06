import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlayerDto) {
    const { user_id, parent_id, birth_date, position, jersey_no } = dto;

    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(
        `Foydalanuvchi topilmadi: user_id = ${user_id}`,
      );
    }

    if (parent_id) {
      const parent = await this.prisma.parents.findUnique({
        where: { id: parent_id },
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent topilmadi: parent_id = ${parent_id}`,
        );
      }

      await this.prisma.user.update({
        where: { id: parent.user_id },
        data: { is_active: true },
      });
    }

    return this.prisma.players.create({
      data: {
        user_id,
        parent_id,
        birth_date,
        position,
        jersey_no,
      },
    });
  }

  // async findAll(filters: { position?: string }) {
  //   const players = await this.prisma.players.findMany({
  //     where: {
  //       position: filters.position
  //         ? { contains: filters.position, mode: 'insensitive' }
  //         : undefined,
  //     },
  //     include: { user: true },
  //   });

  //   const today = new Date();

  //   return Promise.all(
  //     players.map(async (player) => {
  //       const birthDate = new Date(player.birth_date);
  //       let age = today.getFullYear() - birthDate.getFullYear();
  //       const m = today.getMonth() - birthDate.getMonth();
  //       if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //         age--;
  //       }

  //       const fee = await this.prisma.age_Group_Fess.findFirst({
  //         where: {
  //           min_age: { lte: age },
  //           max_age: { gte: age },
  //         },
  //       });

  //       return {
  //         ...player,
  //         age,
  //         monthly_fee: fee?.monthly_fee?.toNumber() || 0,
  //       };
  //     }),
  //   );
  // }
  async findAll() {
    try {
      return await this.prisma.players.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Foydalanuvchilarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.players.findUnique({ where: { id } });
      if (!user) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  // async findOne(id: number) {
  //   const player = await this.prisma.players.findUnique({
  //     where: { id },
  //     include: { user: true },
  //   });

  //   if (!player) {
  //     throw new NotFoundException('O‘yinchi topilmadi');
  //   }

  //   const today = new Date();
  //   const birthDate = new Date(player.birth_date);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }

  //   const fee = await this.prisma.age_Group_Fess.findFirst({
  //     where: {
  //       min_age: { lte: age },
  //       max_age: { gte: age },
  //     },
  //   });

  //   return {
  //     ...player,
  //     age,
  //     monthly_fee: fee?.monthly_fee?.toNumber() || 0,
  //   };
  // }

  async update(id: number, dto: UpdatePlayerDto) {
    const player = await this.prisma.players.findUnique({ where: { id } });

    if (!player) {
      throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
    }

    return this.prisma.players.update({
      where: { id },
      data: {
        ...dto,
        birth_date: dto.birth_date ? new Date(dto.birth_date) : undefined,
      },
    });
  }

  async remove(id: number) {
    const player = await this.prisma.players.findUnique({ where: { id } });

    if (!player) {
      throw new NotFoundException('O‘yinchi topilmadi');
    }

    return this.prisma.players.delete({ where: { id } });
  }

  async getPlayerPayments(id: number) {
    const player = await this.prisma.players.findUnique({ where: { id } });
    if (!player) {
      throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
    }

    return this.prisma.payments.findMany({
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
  }

  async getPlayerInjuries(id: number) {
    const player = await this.prisma.players.findUnique({ where: { id } });
    if (!player) {
      throw new NotFoundException(`O‘yinchi topilmadi: id = ${id}`);
    }

    return this.prisma.injuries.findMany({
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
  }

  async createByParent(parentId: number, dto: CreatePlayerDto) {
    const parent = await this.prisma.parents.findUnique({
      where: { id: parentId },
    });
    if (!parent) {
      throw new NotFoundException('Ota-ona topilmadi');
    }

    await this.prisma.user.update({
      where: { id: parent.user_id },
      data: { is_active: true },
    });

    return this.prisma.players.create({
      data: {
        ...dto,
        parent_id: parentId,
      },
    });
  }
}
