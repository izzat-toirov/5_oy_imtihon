import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtGuard } from '../common/guards/jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';
import { SelfOrRolesGuard } from '../common/guards/self.guard';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  @ApiQuery({ name: 'full_name', required: false })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: UserRole,
  })
  @Get()
  findAll(
    @Query('full_name') full_name?: string,
    @Query('role') role?: string,
  ) {
    return this.userService.findAll({ full_name, role });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(SelfOrRolesGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('activate/:link')
  activateUser(@Param('link') link: string) {
    return this.userService.activateUser(link);
  }
}
