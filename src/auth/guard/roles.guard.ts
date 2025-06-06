import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLE_PERMISSIONS as permissions } from '../utils/rbac/roles-permissions';
import { User } from '@prisma/client';
import { ROLES } from '../utils/rbac/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new Logger('Roles Guard');

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    this.logger.log('Checking permissions...');

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [context.getHandler(), context.getClass()]);

    // console.log('Permissions, ', requiredPermissions);
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    const user = context.switchToHttp().getRequest<Request>().user as User;

    this.checkPermission(user.role, requiredPermissions);
    return true;
  }

  checkPermission(payloadRole: string, permission: string[]) {
    this.logger.log('Permission Check called ...');
    const rolePermissions: string[] | undefined =
      permissions[payloadRole.toUpperCase() as keyof typeof permissions];
    if (!rolePermissions)
      throw new InternalServerErrorException('Role not found.');

    let found = false;
    for (let i = 0; i < permission.length; i++) {
      if (rolePermissions.includes(permission[i])) {
        found = true;
        break;
      }
    }
    if (!found) throw new UnauthorizedException('User not authorised to perform this action');
  }
}
