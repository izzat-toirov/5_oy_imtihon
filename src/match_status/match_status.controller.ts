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
} from '@nestjs/common';
import { MatchStatusService } from './match_status.service';
import { CreateMatchStatusDto } from './dto/create-match_status.dto';
import { UpdateMatchStatusDto } from './dto/update-match_status.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('match-status')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class MatchStatusController {
  constructor(private readonly matchStatusService: MatchStatusService) {}

  @Roles('ADMIN', 'COACH')
  @Post()
  create(@Body() createMatchStatusDto: CreateMatchStatusDto) {
    return this.matchStatusService.create(createMatchStatusDto);
  }

  @Roles('ADMIN', 'COACH', 'PLAYER')
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @Get()
  findAll(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.matchStatusService.findAll({ limit, offset });
  }

  @Roles('ADMIN', 'COACH', 'PLAYER', 'PARENT')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchStatusService.findOne(+id);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchStatusDto: UpdateMatchStatusDto,
  ) {
    return this.matchStatusService.update(+id, updateMatchStatusDto);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchStatusService.remove(+id);
  }
}
