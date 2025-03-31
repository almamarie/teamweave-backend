import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, SetMetadata, UseGuards } from '@nestjs/common';
import { AdminUser, User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto, ProfileDto } from './dto';
import { RolesGuard } from '../../src/auth/guard/roles.guard';
import { formatProfile, formatUser } from '../../src/auth/utils/format-user';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { MessageEntity } from 'src/entities';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  @SetMetadata('permissions', ['get:own:user', 'pairer:user'])
  getMe(@GetUser() user: User) {
    return {
      status: true,
      message: 'User retrieved',
      data: formatUser(user)
    };
  }

  @Get('admin/:userId')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  @SetMetadata('permissions', ['pairer:user'])
  async getUserById(@Param('userId') userId: string) {
    return {
      status: true,
      message: 'User retrieved',
      data: formatUser(await this.userService.getUserById(userId))
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/:userId')
  @ApiNoContentResponse()
  @SetMetadata('permissions', ['pairer:user'])
  async deleteUserById(@Param('userId') userId: string) {
    return {
      status: true,
      message: 'User retrieved',
      data: await this.userService.deleteUserById(userId)
    };
  }

  @Patch('')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  @SetMetadata('permissions', ['patch:own:user'])
  async editUser(@Body() dto: EditUserDto, @GetUser('userId') userId: string) {
    return {
      status: true,
      message: 'User retrieved',
      data: formatUser(await this.userService.editUser(userId, dto))
    };
  }

  @Get('profile')
  @SetMetadata('permissions', ['get:own:profile'])
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  async getUserProfile(@GetUser() user: User) {
    return {
      status: true,
      message: 'User retrieved',
      data: formatProfile(user)
    };
  }

  @Get('profile/:userId')
  @SetMetadata('permissions', ['get:admin:profile'])
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  async getUserProfileAdmin(@Param('userId') userId: string) {
    return {
      status: true,
      message: 'User retrieved',
      data: await this.userService.getUserProfileAdmin(userId)
    };
  }

  @Patch('profile')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  @SetMetadata('permissions', ['patch:own:user'])
  async updateProfile(@Body() dto: ProfileDto, @GetUser('userId') userId: string) {
    return {
      status: true,
      message: 'User retrieved',
      data: formatProfile(await this.userService.updateUserProfile(userId, dto))
    };
  }
}


// plywood - 100
// wood - 100 + 50
// nails - 50
// workmanship - 150

// total = 100 + 100 + 50 + 50 + 150 = 400

