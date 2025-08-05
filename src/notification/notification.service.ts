import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const { user_id, title, message, is_read } = createNotificationDto;

      const numericUserId = Number(user_id);

      const existingUser = await this.prismaService.user.findUnique({
        where: { id: numericUserId },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: user_id = ${numericUserId}`,
        );
      }

      return this.prismaService.notification.create({
        data: {
          user_id: numericUserId,
          title,
          message,
          is_read,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(filters: { is_read?: boolean }) {
    try {
      await this.prismaService.notification.updateMany({
        data: { is_read: true },
      });
      return await this.prismaService.notification.findMany({
        where: {
          is_read: filters.is_read,
        },
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Bildirishnomalarni olishda xatolik yuz berdi',
      );
    }
  }
  

  async findOne(id: number) {
    try {
      await this.prismaService.notification.updateMany({
        data: { is_read: true },
      });
      const notification = await this.prismaService.notification.findFirst({
        where: {id,},
      });
      if (!notification) {
        return { error: 'Bildirishnoma topilmadi yoki hali o‘qilmagan' };
      }
      return notification;
    } catch (error) {
      return error;
    }
  }
  

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      return await this.prismaService.notification.update({
        where: { id },
        data: updateNotificationDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.notification.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.notification.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
