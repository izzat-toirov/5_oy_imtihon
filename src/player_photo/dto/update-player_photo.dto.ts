import { PartialType } from '@nestjs/swagger';
import { CreatePlayerPhotoDto } from './create-player_photo.dto';

export class UpdatePlayerPhotoDto extends PartialType(CreatePlayerPhotoDto) {}
