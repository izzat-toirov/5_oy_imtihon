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
  ParseIntPipe,
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
  ApiParam,
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

  // @Roles('ADMIN')
  // @UseGuards(JwtGuard, RolesGuard)
  // @ApiQuery({ name: 'position', required: false })
  // @Get()
  // findAll(@Query('position') position?: string) {
  //   return this.playersService.findAll({ position });
  // }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  // @Roles('ADMIN', 'PLAYER', 'PARENT')
  // @UseGuards(JwtGuard, SelfOrRolesGuard)
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

  @Roles('ADMIN', 'PLAYER', 'PARENT')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Get(':id/payments')
  @ApiOperation({ summary: 'O‘yinchining barcha to‘lovlarini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Player ID' })
  getPlayerPayments(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.getPlayerPayments(id);
  }

  @Roles('ADMIN', 'PLAYER', 'PARENT')
  @UseGuards(JwtGuard, SelfOrRolesGuard)
  @Get(':id/injuries')
  @ApiOperation({ summary: 'O‘yinchining jarohat tarixini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Player ID' })
  getPlayerInjuries(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.getPlayerInjuries(id);
  }

}
