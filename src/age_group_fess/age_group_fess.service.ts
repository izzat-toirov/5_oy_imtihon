import { Injectable } from '@nestjs/common';
import { CreateAgeGroupFessDto } from './dto/create-age_group_fess.dto';
import { UpdateAgeGroupFessDto } from './dto/update-age_group_fess.dto';

@Injectable()
export class AgeGroupFessService {
  create(createAgeGroupFessDto: CreateAgeGroupFessDto) {
    return 'This action adds a new ageGroupFess';
  }

  findAll() {
    return `This action returns all ageGroupFess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ageGroupFess`;
  }

  update(id: number, updateAgeGroupFessDto: UpdateAgeGroupFessDto) {
    return `This action updates a #${id} ageGroupFess`;
  }

  remove(id: number) {
    return `This action removes a #${id} ageGroupFess`;
  }
}
