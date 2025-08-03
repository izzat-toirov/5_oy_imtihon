import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerPhotoDto } from './dto/create-player_photo.dto';
import { UpdatePlayerPhotoDto } from './dto/update-player_photo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlayerPhotoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPlayerPhotoDto: CreatePlayerPhotoDto, photo_url: string) {
    try {
      const { player_id } = createPlayerPhotoDto;

      const numericUserId = Number(player_id);

      if (!photo_url || photo_url.trim() === '') {
        throw new BadRequestException('Rasm (photo_url) yuborilishi shart');
      }

      const existingUser = await this.prismaService.players.findUnique({
        where: { id: numericUserId },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: player_id = ${numericUserId}`,
        );
      }

      return this.prismaService.player_Photo.create({
        data: {
          player_id: numericUserId,
          photo_url,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.player_Photo.findMany({
        include: {
          player: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'O‘yinchilarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.player_Photo.findUnique({
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

  async update(id: number, updatePlayerPhotoDto: UpdatePlayerPhotoDto) {
    try {
      return await this.prismaService.player_Photo.update({
        where: { id },
        data: updatePlayerPhotoDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.player_Photo.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.player_Photo.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
