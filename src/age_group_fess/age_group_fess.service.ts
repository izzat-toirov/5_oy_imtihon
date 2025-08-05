import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAgeGroupFessDto } from './dto/create-age_group_fess.dto';
import { UpdateAgeGroupFessDto } from './dto/update-age_group_fess.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgeGroupFessService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAgeGroupFessDto: CreateAgeGroupFessDto) {
    try {
      const { age_group, max_age, min_age, monthly_fee } = createAgeGroupFessDto;
  
      return await this.prismaService.age_Group_Fess.create({
        data: {
          age_group,
          max_age,
          min_age,
          monthly_fee,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Yosh guruhi to‘lovi yaratishda xatolik',
      );
    }
  }
  

  async findAll(filters: { age_group?: string }) {
    try {
      return await this.prismaService.age_Group_Fess.findMany({
        where: {
          age_group: filters.age_group ? { contains: filters.age_group, mode: 'insensitive' } : undefined,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const age_Group_Fess = await this.prismaService.age_Group_Fess.findUnique({ where: { id } });
      if (!age_Group_Fess) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return age_Group_Fess;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateAgeGroupFessDto: UpdateAgeGroupFessDto) {
    try {
      return await this.prismaService.age_Group_Fess.update({
        where: { id },
        data: updateAgeGroupFessDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const existingage_Group_Fess = await this.prismaService.age_Group_Fess.findUnique({
        where: { id },
      });

      if (!existingage_Group_Fess) {
        return { error: 'Foydalanuvchi topilmadi' };
      }
      return await this.prismaService.age_Group_Fess.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
