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
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Roles } from '../common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('players')
@ApiBearerAuth()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiQuery({ name: 'position', required: false })
  @Get()
  findAll(@Query('position') position?: string) {
    return this.playersService.findAll({ position });
  }

  @Roles('ADMIN', 'PLAYER', 'PARENT')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @Roles('ADMIN', 'PLAYER')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }

}
