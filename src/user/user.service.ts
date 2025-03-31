import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EditUserDto, ProfileDto } from './dto';
import { User } from '@prisma/client';
import { formatProfile } from 'src/auth/utils/format-user';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { userId: userId },
      data: { ...dto }
    });
    return user;
  }

  async getUserById(userId: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { userId } });
  }

  async deleteUserById(userId: string) {
    return await this.prismaService.user.delete({ where: { userId } });
  }

  async getUserProfileAdmin(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { userId },
    });

    if (!user) throw new NotFoundException

    return formatProfile(user);
  }

  async updateUserProfile(userId: string, dto: ProfileDto) {
    return await this.prismaService.user.update({
      where: { userId },
      data: { ...dto }
    });
  }
}
