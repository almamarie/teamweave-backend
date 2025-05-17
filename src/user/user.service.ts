import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { EditUserDto, ProfileDto } from './dto';
import { Gender, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(id: string, dto: EditUserDto) {
    if (!Gender[dto.gender.toLowerCase()]) {
      throw new BadRequestException("Invalid Gender field")
    }
    const user = await this.prismaService.user.update({
      where: {  id },
      data: { ...dto, gender: Gender[dto.gender.toLowerCase()] }
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { id }, include: {projects: true, skills:true, journeyMaps:true, uiuxDesigns: true, frontends:true, backends:true, fullstacks:true, activityEvents:true, comments: true, projectComments: true, projectUpvotes:true, userStories: true, userJourneys: true} });
  }

  async deleteUserById(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }

  async getUserProfileAdmin(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) throw new NotFoundException

    return user;
  }

  async updateUserProfile(id: string, dto: ProfileDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: { ...dto }
    });
  }
}
