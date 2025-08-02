import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerParentDto } from './dto/create-player_parent.dto';
import { UpdatePlayerParentDto } from './dto/update-player_parent.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerParentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePlayerParentDto) {
    const { player_id, parent_id } = dto;
  
    const player = await this.prismaService.players.findUnique({ where: { id: player_id } });
    if (!player) {
      throw new NotFoundException(`Oʻyinchi topilmadi: player_id = ${player_id}`);
    }
  
    const parent = await this.prismaService.parents.findUnique({ where: { id: parent_id } });
    if (!parent) {
      throw new NotFoundException(`Ota-ona topilmadi: parent_id = ${parent_id}`);
    }
  
    return this.prismaService.player_Parents.create({
      data: {
        player_id,
        parent_id,
      },
    });
  }
  

  async findAll() {
    try {
      return await this.prismaService.player_Parents.findMany({
        include: {
          player: true,
          parent: true
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.player_Parents.findUnique({
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

  async update(id: number, updatePlayerParentDto: UpdatePlayerParentDto) {
    try {
      return await this.prismaService.player_Parents.update({
        where: { id },
        data: updatePlayerParentDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.player_Parents.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.player_Parents.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
