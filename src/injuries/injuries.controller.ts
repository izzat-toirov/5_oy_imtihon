import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InjuriesService } from './injuries.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('injuries')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class InjuriesController {
  constructor(private readonly injuriesService: InjuriesService) {}

  @Roles('ADMIN', 'COACH')
  @Post()
  create(@Body() createInjuryDto: CreateInjuryDto) {
    return this.injuriesService.create(createInjuryDto);
  }

  @Roles('ADMIN', 'COACH')
  @Get()
  findAll() {
    return this.injuriesService.findAll();
  }

  @Roles('ADMIN', 'COACH', 'PLAYER', 'PARENT')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injuriesService.findOne(+id);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto) {
    return this.injuriesService.update(+id, updateInjuryDto);
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuriesService.remove(+id);
  }
}
