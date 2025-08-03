import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const {
        parent_id,
        player_id,
        amout,
        payment_date,
        method,
        prelod,
        reference,
        status,
        notes,
      } = createPaymentDto;

      const numericPlayerId = Number(player_id);
      const numericParentId = Number(parent_id);

      const existingPlayer = await this.prismaService.players.findUnique({
        where: { id: numericPlayerId },
      });

      if (!existingPlayer) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: player_id = ${numericPlayerId}`,
        );
      }

      const existingCoach = await this.prismaService.parents.findUnique({
        where: { id: numericParentId },
      });

      if (!existingCoach) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: parent_id = ${numericParentId}`,
        );
      }
      const newPerformance = await this.prismaService.payments.create({
        data: {
          parent_id: numericParentId,
          player_id: numericPlayerId,
          amout,
          payment_date: new Date(payment_date),
          method,
          prelod,
          reference,
          status,
          notes,
        },
      });

      return newPerformance;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.payments.findMany({
        include: {
          parent: true,
          player: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.payments.findUnique({
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

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ) {
    try {
      return await this.prismaService.payments.update({
        where: { id },
        data: updatePaymentDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser =
        await this.prismaService.payments.findUnique({
          where: { id },
        });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.payments.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }

}
