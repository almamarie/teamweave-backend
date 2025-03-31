import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { NewAdminDto, SetAdminPasswordDto } from './dto';
import { GeneralResponseEntity } from 'src/utils/entity';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AdminUser } from '@prisma/client';
import { ForgotPasswordDto, ResetPasswordDto, SigninDto, UpdatePasswordDto } from 'src/auth/dto';
import { GeneralResponseType } from 'src/auth/types';
import { GetUser } from 'src/auth/decorator';
import { AccessTokenEntity, MessageEntity } from 'src/entities';

@Controller('/auth/admin')
export class AdminAuthController {
  constructor(private adminService: AdminAuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard, RolesGuard)
  @SetMetadata('permissions', ['create:admin'])
  @Post('create')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async createAdmin(@Body() dto: NewAdminDto): Promise<GeneralResponseType> {
    await this.adminService.createAdminUser(dto);
    return { status: true, message: 'user created. Account activation link sent to provided email.', data: {} };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('set-password/:token')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async setNewAdminPassword(@Param('token') token: string, @Body() dto: SetAdminPasswordDto): Promise<GeneralResponseType> {
    await this.adminService.setNewAdminPassword(token, dto);
    return { status: true, message: 'Password reset successful.', data: {} };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOkResponse({
    type: GeneralResponseEntity<AdminUser>,
    isArray: false
  })
  async signin(@Body() dto: SigninDto): Promise<GeneralResponseType> {
    const accessToken = await this.adminService.signin(dto);
    return { status: true, message: 'user signed in', data: accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<GeneralResponseType> {
    await this.adminService.forgotPassword(dto);
    return {
      status: true,
      message: 'Token sent to email!',
      data: {}
    };
  }

  @HttpCode(HttpStatus.OK)
  @Patch('reset-password/:token')
  @ApiOkResponse({
    type: MessageEntity,
    isArray: false
  })
  async resetPassword(@Param('token') token: string, @Body() dto: ResetPasswordDto): Promise<GeneralResponseType> {
    await this.adminService.resetPassword(dto, token);
    return {
      status: true,
      message: 'Password reset successful.',
      data: {}
    };
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('update-password')
  @ApiOkResponse({
    type: AccessTokenEntity,
    isArray: false
  })
  async updatePassword(@Body() dto: UpdatePasswordDto, @GetUser() user: AdminUser): Promise<GeneralResponseType> {
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const accessToken = await this.adminService.updatePassword(dto, user);
    return { status: true, message: 'Password updated.', data: accessToken };
  }
}
