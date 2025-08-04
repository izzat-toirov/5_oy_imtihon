import { PartialType } from '@nestjs/swagger';
import { CreateAgeGroupFessDto } from './create-age_group_fess.dto';

export class UpdateAgeGroupFessDto extends PartialType(CreateAgeGroupFessDto) {}
