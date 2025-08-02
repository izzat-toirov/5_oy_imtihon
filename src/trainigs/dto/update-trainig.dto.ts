import { PartialType } from '@nestjs/swagger';
import { CreateTrainigDto } from './create-trainig.dto';

export class UpdateTrainigDto extends PartialType(CreateTrainigDto) {}
