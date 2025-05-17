import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, SetMetadata, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { EditUserDto, ProfileDto } from './dto';
import { RolesGuard } from '../../src/auth/guard/roles.guard';
import { formatUser } from '../../src/auth/utils/format-user';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { USER_PERMISSIONS } from 'src/auth/utils/rbac/permissions';
import { CreateResponse, GeneralResponseEntity } from 'src/entities';
import { FormattedUserType } from 'src/auth/types';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiOkResponse({
    type: GeneralResponseEntity<FormattedUserType>,
    isArray: false
  })
  @SetMetadata('permissions', [USER_PERMISSIONS.GET_OWN_DATA])
  getMe(@GetUser() user: User): GeneralResponseEntity<FormattedUserType> {
    return CreateResponse(true, 'User retrieved', formatUser(user))
  }

  @Get('admin/:userId')
  @ApiOkResponse({
    type: GeneralResponseEntity<FormattedUserType>,
    isArray: false
  })
  @SetMetadata('permissions', [USER_PERMISSIONS.GET_OTHER_DATA])
  async getUserById(@Param('userId') userId: string): Promise<GeneralResponseEntity<FormattedUserType>> {
    return CreateResponse (true, 'User retrieved',formatUser(await this.userService.getUserById(userId)))
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('admin/:userId')
  @ApiNoContentResponse()
  @SetMetadata('permissions', [USER_PERMISSIONS.DELETE_OTHER])
  async deleteUserById(@Param('userId') userId: string) {
    return {
      status: true,
      message: 'User User deleted',
      data: await this.userService.deleteUserById(userId)
    };
  }

  @Patch('')
  @ApiOkResponse({
    type: GeneralResponseEntity<FormattedUserType>,
    isArray: false
  })
  @SetMetadata('permissions', [USER_PERMISSIONS.UPDATE_OWN_DATA])
  async editUser(@Body() dto: EditUserDto, @GetUser('id') userId: string): Promise<GeneralResponseEntity<FormattedUserType>> {
    console.log("dto: ", dto)
    return CreateResponse( true, 'User retrieved',formatUser(await this.userService.editUser(userId, dto)))
  }

  // @Get('profile')
  // @SetMetadata('permissions', [USER_PERMISSIONS.GET_OWN_DATA])
  // @ApiOkResponse({
  //   type: GeneralResponseEntity,
  //   isArray: false
  // })
  // async getUserProfile(@GetUser() user: User) {
  //   return {
  //     status: true,
  //     message: 'User retrieved',
  //     data: formatProfile(user)
  //   };
  // }

  @Get('profile/:userId')
  @SetMetadata('permissions', [USER_PERMISSIONS.GET_OTHER_DATA])
  @ApiOkResponse({
    type: GeneralResponseEntity<FormattedUserType>,
    isArray: false
  })
  async getUserProfileAdmin(@Param('userId') userId: string): Promise<GeneralResponseEntity<FormattedUserType>> {
    return CreateResponse(true, 'User retrieved', formatUser(await this.userService.getUserProfileAdmin(userId)));
  }

  // @Patch('profile')
  // @ApiOkResponse({
  //   type: GeneralResponseEntity,
  //   isArray: false
  // })
  // @SetMetadata('permissions', [USER_PERMISSIONS.UPDATE_OTHER_DATA])
  // async updateProfile(@Body() dto: ProfileDto, @GetUser('userId') userId: string) {
  //   return {
  //     status: true,
  //     message: 'User retrieved',
  //     data: formatProfile(await this.userService.updateUserProfile(userId, dto))
  //   };
  // }
}


// plywood - 100
// wood - 100 + 50
// nails - 50
// workmanship - 150

// total = 100 + 100 + 50 + 50 + 150 = 400

