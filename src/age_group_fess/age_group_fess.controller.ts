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
import { AgeGroupFessService } from './age_group_fess.service';
import { CreateAgeGroupFessDto } from './dto/create-age_group_fess.dto';
import { UpdateAgeGroupFessDto } from './dto/update-age_group_fess.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('age-group-fess')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
export class AgeGroupFessController {
  constructor(private readonly ageGroupFessService: AgeGroupFessService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createAgeGroupFessDto: CreateAgeGroupFessDto) {
    return this.ageGroupFessService.create(createAgeGroupFessDto);
  }

  @Roles('ADMIN', 'COACH')
  @ApiQuery({ name: 'age_group', required: false })
  @Get()
  findAll(@Query('age_group') age_group?: string) {
    return this.ageGroupFessService.findAll({ age_group });
  }

  @Roles('ADMIN', 'COACH')
  @UseGuards(SelfOrRolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ageGroupFessService.findOne(+id);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgeGroupFessDto: UpdateAgeGroupFessDto,
  ) {
    return this.ageGroupFessService.update(+id, updateAgeGroupFessDto);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ageGroupFessService.remove(+id);
  }
}
