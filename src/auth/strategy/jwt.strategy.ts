import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminUser, User } from '@prisma/client';
import { ROLES } from '../utils/rbac/roles';

type PayloadType = { sub: string; email: string; role: string, iss: string, aud: string }
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(PassportStrategy.name);
  constructor(
    config: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
    });
  }
  async validate(payload: PayloadType) {
    this.logger.log('Verifying user');
    let user: User | AdminUser | undefined;

    if (payload.iss !== 'https://teamweave-api.com' || payload.aud !== 'https://teamweave.com') {
      throw new UnauthorizedException("Unauthorised")
    }

    if (payload.role === ROLES.ADMIN || payload.role === ROLES.SUPER_ADMIN) {
      user = await this.prisma.adminUser.findUnique({
        where: { id: payload.sub }
      });
    } else if (payload.role === ROLES.USER) {
      user = await this.prisma.user.findUnique({
        where: { id: payload.sub }
      });
      if (!user.accountIsActivated) {
        throw new UnauthorizedException("Account not activated")
      }
    } else {
      throw new UnauthorizedException('Unauthorised');
    }

    if (!user) throw new UnauthorizedException('Unauthorised');

    if (!user.accountIsActivated) {
      throw new UnauthorizedException('Account not activated');
    }
    return user;
  }
}
