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
import { TrainigsService } from './trainigs.service';
import { CreateTrainigDto } from './dto/create-trainig.dto';
import { UpdateTrainigDto } from './dto/update-trainig.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('trainigs')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class TrainigsController {
  constructor(private readonly trainigsService: TrainigsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createTrainigDto: CreateTrainigDto) {
    return this.trainigsService.create(createTrainigDto);
  }

  @Roles('ADMIN', 'COACH')
  @ApiQuery({ name: 'location', required: false })
  @Get()
  findAll(@Query('location') location?: string) {
    return this.trainigsService.findAll({ location });
  }
  
  @Roles('ADMIN', 'COACH')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainigsService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainigDto: UpdateTrainigDto) {
    return this.trainigsService.update(+id, updateTrainigDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainigsService.remove(+id);
  }
}
