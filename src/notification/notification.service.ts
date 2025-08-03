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

  async findAll() {
    try {
      return await this.prismaService.notification.findMany({
        include: {
          user: true,
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
      const user = await this.prismaService.notification.findUnique({
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
  async markAsRead(id: number) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException('Bildirishnoma topilmadi');
    }

    return this.prismaService.notification.update({
      where: { id },
      data: { is_read: true },
    });
  }
}
