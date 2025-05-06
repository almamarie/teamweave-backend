import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EditUserDto, ProfileDto } from './dto';
import { User } from '@prisma/client';
import { formatProfile } from 'src/auth/utils/format-user';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(id: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: {  id },
      data: { ...dto }
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id } });
  }

  async deleteUserById(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async getUserProfileAdmin(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) throw new NotFoundException

    return formatProfile(user);
  }

  async updateUserProfile(id: string, dto: ProfileDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...dto }
    });
  }
}
