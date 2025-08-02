import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto, photo_url: string) {
    try {
      const { user_id, birth_date, position, jersey_no } = createPlayerDto;
  
    const numericUserId = Number(user_id);
  

    if (!photo_url || photo_url.trim() === '') {
      throw new BadRequestException('Rasm (photo_url) yuborilishi shart');
    }
  
    const existingUser = await this.prismaService.user.findUnique({
      where: { id: numericUserId },
    });
  
    if (!existingUser) {
      throw new NotFoundException(`Foydalanuvchi topilmadi: user_id = ${numericUserId}`);
    }
  
    return this.prismaService.players.create({
      data: {
        user_id: numericUserId,
        birth_date: new Date(birth_date),
        position,
        jersey_no: Number(jersey_no),
        photo_url,
      },
    });
    } catch (error) {
      return error;
    }
  }
  

  async findAll() {
    try {
      return await this.prismaService.players.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('O‘yinchilarni olishda xatolik yuz berdi');
    }
  }
  

  async findOne(id: number) {
    try {
      const user = await this.prismaService.players.findUnique({
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

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      return await this.prismaService.players.update({
        where: { id },
        data: updatePlayerDto,
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
}
