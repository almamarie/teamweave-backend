import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ForgotPasswordDto, SigninDto, UpdatePasswordDto, ResetPasswordDto } from './dto';
import { User } from '@prisma/client';
import { GetUser } from './decorator';
import { JwtGuard } from './guard';
import { ApiOkResponse } from '@nestjs/swagger';

import { GeneralResponseType } from './types';
import { CreateResponse, GeneralResponseEntity } from 'src/entities';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup/user')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async signup(@Body() dto: AuthDto): Promise<GeneralResponseType> {
    const access_token = await this.authService.signup(dto);
    return CreateResponse(true, 'user created', access_token );
  }

  @HttpCode(HttpStatus.OK)
  @Patch('signup/activate-account/:token')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async activateAccount(@Param('token') token: string): Promise<GeneralResponseType> {
    await this.authService.activateAccount(token);
    return  CreateResponse(true, 'Account activated.');
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async signin(@Body() dto: SigninDto): Promise<GeneralResponseEntity> {
    const accessToken = await this.authService.signin(dto);
    return CreateResponse(true,  "", {accessToken: accessToken.access_token} );
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<GeneralResponseType> {
    await this.authService.forgotPassword(dto);
    return CreateResponse( true, 'Token sent to email!', {}
    );
  }

  @HttpCode(HttpStatus.OK)
  @Patch('reset-password/:token')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async resetPassword(@Param('token') token: string, @Body() dto: ResetPasswordDto): Promise<GeneralResponseType> {
    await this.authService.resetPassword(dto, token);
    return CreateResponse ( true, 'Password reset successful.', {});
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('update-password')
  @ApiOkResponse({
    type: GeneralResponseEntity,
    isArray: false
  })
  async updatePassword(@Body() dto: UpdatePasswordDto, @GetUser() user: User): Promise<GeneralResponseType> {
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    const accessToken = await this.authService.updatePassword(dto, user);
    return CreateResponse(true, 'Password updated.', accessToken );
  }
}
