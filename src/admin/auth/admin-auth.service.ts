import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import * as argon from 'argon2';
import { Roles } from 'src/types';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
import { SetAdminPasswordDto, NewAdminDto } from './dto';
import { ForgotPasswordDto, ResetPasswordDto, SigninDto, UpdatePasswordDto } from 'src/auth/dto';
import { JwtService } from '@nestjs/jwt';
import { AdminUser } from '@prisma/client';

@Injectable()
export class AdminAuthService {
  private logger = new Logger(AdminAuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private emailService: EmailService,
    private config: ConfigService
  ) {}

  async createAdminUser(dto: NewAdminDto): Promise<void> {
    const linkDuration = 30;
    const password = crypto.randomBytes(32).toString('hex');
    const passwordHash = await argon.hash(password);

    const admin = await this.prisma.adminUser.create({
      data: {
        ...dto,
        passwordHash,
        passwordIsSet: false,
        role: Roles.ADMIN
      }
    });

    const resetToken = await this.createPasswordSetToken(admin.id, linkDuration);

    await this.emailService.sendMail({
      to: dto.email,
      template: './new-admin',
      subject: `Welcome ${dto.email} to HeartzUp`,
      context: {
        email: dto.email,
        firstName: dto.firstName,
        linkDuration,
        resetLink: `${this.config.get('frontendResetPasswordUrl')}/${resetToken}`,
        currentYear: new Date().getMonth()
      }
    });
  }

  async setNewAdminPassword(token: string, dto: SetAdminPasswordDto) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // this.logger.log(`Hashed token: ${hashedToken}\nToken: ${token}`);

    if (dto.password !== dto.confirmPassword) throw new BadRequestException('Passwords do not match');
    const user = await this.prisma.adminUser.findFirst({
      where: {
        passwordSetToken: hashedToken,
        passwordIsSet: false,
        passwordSetExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) throw new BadRequestException('Invalid token');

    if (!user.passwordIsSet) {
      await this.prisma.adminUser.update({
        where: {
          id: user.id
        },
        data: {
          passwordSetToken: null,
          passwordSetExpires: null,
          passwordIsSet: true,
          passwordSetAt: new Date(Date.now()),
          accountIsActivated: true,
          accountActivatedAt: new Date(Date.now()),
          passwordHash: await argon.hash(dto.password)
        }
      });
    } else {
      throw new BadRequestException('Invalid token');
    }

    this.logger.log('Account activated.');
  }

  async signin(dto: SigninDto): Promise<{ access_token: string }> {
    const user = await this.prisma.adminUser.findUnique({
      where: {
        email: dto.email
      }
    });
    if (!user) {
      throw new ForbiddenException('Invalid username or password.');
    }

    if (!(await argon.verify(user.passwordHash, dto.password))) {
      throw new ForbiddenException('Invalid username or password.');
    }

    if (!user.accountIsActivated) {
      throw new ForbiddenException('Account not activated');
    }

    return this.signToken(user.id, user.role);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    this.logger.log('Forgot password called...');

    const user = await this.prisma.adminUser.findUnique({
      where: { email: dto.email }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = await this.createPasswordResetToken(user.id);

    const resetURL = `${this.config.get('frontendResetPasswordUrl')}/${resetToken}`;

    this.logger.log('Sending password reset email...');
    await this.sendPasswordResetEmail(user, resetURL);
  }

  async resetPassword(dto: ResetPasswordDto, resetToken: string): Promise<void> {
    this.logger.log('Reset password called...');

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await this.prisma.adminUser.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    const hash = await argon.hash(dto.newPassword);

    if (hash === user.passwordHash) {
      throw new BadRequestException('New password cannot be same as previous password');
    }

    await this.prisma.adminUser.update({
      where: {
        id: user.id
      },
      data: {
        passwordHash: hash,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
        passwordChangedAt: new Date(Date.now())
      }
    });
  }

  async updatePassword(dto: UpdatePasswordDto, user: AdminUser): Promise<{ access_token: string }> {
    if (!(await argon.verify(user.passwordHash, dto.currentPassword))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (dto.newPassword !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hash = await argon.hash(dto.newPassword);

    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash: hash }
    });

    return this.signToken(user.id, user.email);
  }

  private async createPasswordSetToken(id: string, tokenValidDurationMS: number = 10): Promise<string> {
    this.logger.log('Creating adin password reset token...');
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordSetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordSetExpires = new Date(Date.now() + tokenValidDurationMS * 60 * 1000);

    await this.prisma.adminUser.update({
      where: { id },
      data: {
        passwordSetToken,
        passwordSetExpires
      }
    });

    this.logger.log(`{\n  resetToken: ${resetToken}\n passwordResetToken: ${passwordSetToken}\n tokenExpires: ${passwordSetExpires}}`);

    this.logger.log('Done!');
    return resetToken;
  }

  private async createPasswordResetToken(id: string, tokenValidDurationMS: number = 10): Promise<string> {
    this.logger.log('Creating adin password reset token...');
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const passwordResetExpires = new Date(Date.now() + tokenValidDurationMS * 60 * 1000);

    await this.prisma.adminUser.update({
      where: { id },
      data: {
        passwordResetToken,
        passwordResetExpires
      }
    });

    this.logger.log(`{\n  resetToken: ${resetToken}\n passwordResetToken: ${passwordResetToken}\n tokenExpires: ${passwordResetExpires}}`);

    this.logger.log('Done!');
    return resetToken;
  }

  private async signToken(userId: string, role: string): Promise<{ access_token: string }> {
    this.logger.log('Generating jwt...');
    const duration = 60 * 60 * this.config.get<number>('JWT_DURATION');

    const payload = {
      sub: userId,
      iss: 'https://heartzup-api.com',
      aud: 'https://heartzup.com',
      exp: Math.floor(Date.now() / 1000) + duration,
      iat: Math.floor(Date.now() / 1000),
      role: role
    };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET')
    });

    this.logger.log('Done generating jwt.');

    return { access_token: token };
  }

  private async sendPasswordResetEmail(user: AdminUser, resetUrl: string) {
    this.logger.log('Sending password reset email...');
    try {
      await this.emailService.sendMail({
        subject: 'Reset your password',
        to: user.email,
        template: './reset-password.hbs',
        context: {
          firstName: user.firstName,
          resetUrl,
          year: new Date().getFullYear()
        }
      });
    } catch (error) {
      this.prisma.adminUser.update({
        where: { id: user.id },
        data: {
          passwordResetToken: undefined,
          passwordResetExpires: undefined
        }
      });

      this.logger.error('Error sending password reset email!', error);
      throw new ForbiddenException('Error sending password reset email');
    }
  }
}
