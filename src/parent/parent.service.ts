import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createParentDto: CreateParentDto) {
    try {
      const { user_id, relation } = createParentDto;
      const numericUserId = Number(user_id);
      const existingUser = await this.prismaService.user.findUnique({
        where: { id: numericUserId },
      });

      if (!existingUser) {
        throw new NotFoundException(
          `Foydalanuvchi topilmadi: user_id = ${numericUserId}`,
        );
      }
      return this.prismaService.parents.create({
        data: {
          user_id,
          relation
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prismaService.parents.findMany({
        include: {
          user: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.parents.findUnique({
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

  async update(id: number, updateParentDto: UpdateParentDto) {
    try {
      return await this.prismaService.parents.update({
        where: { id },
        data: updateParentDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingUser = await this.prismaService.parents.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.parents.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
