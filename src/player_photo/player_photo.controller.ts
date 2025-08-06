import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PlayerPhotoService } from './player_photo.service';
import { CreatePlayerPhotoDto } from './dto/create-player_photo.dto';
import { UpdatePlayerPhotoDto } from './dto/update-player_photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('player-photo')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class PlayerPhotoController {
  constructor(private readonly playerPhotoService: PlayerPhotoService) {}

  @Roles('ADMIN', 'PLAYER')
  @Post()
  @ApiOperation({ summary: 'Create a new post ✨' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        player_id: { type: 'integer' },
        photo_url: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created 🎉',
  })
  @UseInterceptors(
    FileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: { fileSize: Infinity },
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPlayerPhotoDto: CreatePlayerPhotoDto,
  ) {
    const photo_url = file?.filename;
    return this.playerPhotoService.create(createPlayerPhotoDto, photo_url);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.playerPhotoService.findAll();
  }

  @Roles('ADMIN', 'PLAYER', 'PARENT')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerPhotoService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('photo_url', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9,
          )}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        player_id: { type: 'integer', example: 1 },
        photo_url: { type: 'string', format: 'binary' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePlayerPhotoDto: UpdatePlayerPhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const photo_url = file?.filename;
    return this.playerPhotoService.update(+id, updatePlayerPhotoDto, photo_url);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerPhotoService.remove(+id);
  }
}
