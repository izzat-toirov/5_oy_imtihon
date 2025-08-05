import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePaymentDto) {
    const { parent_id, player_id, payment_date, amount, ...rest } = dto;
  
    const player = await this.prismaService.players.findUnique({
      where: { id: player_id },
    });
    if (!player) throw new NotFoundException(`O'yinchi topilmadi: ${player_id}`);
  
    const parent = await this.prismaService.parents.findUnique({
      where: { id: parent_id },
    });
    if (!parent) throw new NotFoundException(`Ota-ona topilmadi: ${parent_id}`);
  
    return this.prismaService.payments.create({
      data: {
        parent_id,
        player_id,
        amount: Number(amount),
        payment_date: new Date(payment_date),
        ...rest,
      },
    });
  }

  async findAll() {
    const payments = await this.prismaService.payments.findMany({
      include: {
        player: { include: { user: true } },
        parent: true,
      },
    });
    const results = await Promise.all(
      payments.map(async (payment) => {
        const expected_fee = await this.getExpectedFeeByBirthDate(
          payment.player.birth_date,
        );
        const paid = Number(payment.amount);
        const balance = paid - expected_fee;
  
        return {
          ...payment,
          expected_fee,
          paid_amount: paid,
          remaining_balance: balance,
        };
      }),
    );
  
    return results;
  }
  
  
  async findOne(id: number) {
    try {
      const payment = await this.prismaService.payments.findUnique({
        where: { id },
        include: {
          player: true,
          parent: true,
        },
      });
  
      if (!payment) {
        throw new NotFoundException('To‘lov topilmadi');
      }
  
      const expected_fee = await this.getExpectedFeeByBirthDate(
        payment.player.birth_date,
      );
  
      const paid = Number(payment.amount);
      const balance = paid - expected_fee;
  
      return {
        ...payment,
        expected_fee,
        paid_amount: paid,
        remaining_balance: balance,
      };
    } catch (error) {
      throw error;
    }
  }
  

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.prismaService.payments.update({
        where: { id },
        data: updatePaymentDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prismaService.payments.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException('To‘lov topilmadi');
      }

      return await this.prismaService.payments.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  private async getExpectedFeeByBirthDate(birthDate: Date): Promise<number> {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    const fee = await this.prismaService.age_Group_Fess.findFirst({
      where: {
        min_age: { lte: age },
        max_age: { gte: age },
      },
    });
  
    return fee ? fee.monthly_fee.toNumber() : 0;
  }
  
}
