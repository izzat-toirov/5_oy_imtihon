import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtGuard } from '../common/guards/jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { PlayersService } from '../players/players.service';

@Controller('parent')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class ParentController {
  constructor(private readonly parentService: ParentService,
    private readonly playersService: PlayersService,
  ) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createParentDto: CreateParentDto) {
    return this.parentService.create(createParentDto);
  }

  @Roles('ADMIN')
  @ApiQuery({ name: 'relation', required: false })
  @Get()
  findAll(@Query('relation') relation?: string) {
    return this.parentService.findAll({ relation });
  }

  @Roles('ADMIN', 'PLAYER')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentDto: UpdateParentDto) {
    return this.parentService.update(+id, updateParentDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentService.remove(+id);
  }

  @Roles('ADMIN', 'PARENT')
  @Post(':parentId/players')
  @ApiOperation({ summary: 'Ota-ona orqali yangi o‘yinchi (bola) qo‘shish' })
  @ApiParam({ name: 'parentId', type: Number })
  createPlayerForChild(
    @Param('parentId', ParseIntPipe) parentId: number,
    @Body() createPlayerDto: CreatePlayerDto,
  ) {
    return this.playersService.createByParent(parentId, createPlayerDto);
  }
}
