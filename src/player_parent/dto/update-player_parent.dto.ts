import { PartialType } from '@nestjs/swagger';
import { CreatePlayerParentDto } from './create-player_parent.dto';

export class UpdatePlayerParentDto extends PartialType(CreatePlayerParentDto) {}
