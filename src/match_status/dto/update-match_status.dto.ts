import { PartialType } from '@nestjs/swagger';
import { CreateMatchStatusDto } from './create-match_status.dto';

export class UpdateMatchStatusDto extends PartialType(CreateMatchStatusDto) {}
