import { PartialType } from '@nestjs/swagger';
import { CreateTeamPlayerDto } from './create-team_player.dto';

export class UpdateTeamPlayerDto extends PartialType(CreateTeamPlayerDto) {}
