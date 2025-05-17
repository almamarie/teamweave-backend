import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProjectDto, CreateProjectDto } from './dto';
import { Project, ProjectVisibility, VoteType } from '@prisma/client';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);
  constructor(private prisma: PrismaService) {}

  async getAllPublicProjects(): Promise<Project[]> {
    this.logger.log('Fetching all projects');
    return await this.prisma.project.findMany({
      where: {
        visibility: 'PUBLIC'
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            otherNames: true,
            profilePicture: true
          }
        }
      },
      orderBy: [{ likes: 'desc' }]
    });
  }

  async getPublicProjectById(projectId: string): Promise<Project> {
    this.logger.log('Getting project by id: ' + projectId);
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
        visibility: 'PUBLIC'
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            otherNames: true,
            profilePicture: true
          }
        }
      }
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    this.logger.log('Getting projects for user: ' + userId);
    return this.prisma.project.findMany({
      where: {
        createdById: userId
      }
    });
  }

  async getUserProjectById(userId: string, id: string): Promise<Project> {
    this.logger.log('Getting project by id: ' + id + ' for user: ' + userId);
    return this.prisma.project.findFirst({
      where: {
        id: id,
        createdById: userId
      }
    });
  }

  async createProject(userId: string, data: CreateProjectDto): Promise<Project> {
    let project;
    this.logger.log('Creating project: ' + userId);
    await this.prisma.$transaction(async () => {
      project = await this.prisma.project.create({
        data: {
          ...data,
          createdBy: {
            connect: {
              id: userId
            }
          }
        }
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          projectsCount: {
            increment: 1
          }
        }
      });
    });

    return project;
  }

  async updateProject(userId: string, projectId: string, data: UpdateProjectDto): Promise<Project> {
    this.logger.log('Updating project: ' + projectId);

    const project = await this.prisma.project.findFirst({
      where: {
        createdById: userId,
        id: projectId
      }
    });

    if (!project) throw new NotFoundException('Project not found');

    return this.prisma.project.update({
      where: {
        id: projectId,
        createdById: userId
      },
      data: {
        ...data
      }
    });
  }

  async deleteProject(userId: string, id: string): Promise<Project> {
    let project;
    this.logger.log('Creating project: ', userId);
    await this.prisma.$transaction(async () => {
      this.logger.log('Deleting project: ' + id);
      project = await this.prisma.project.delete({
        where: {
          id: id,
          createdById: userId
        }
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          projectsCount: {
            decrement: 1
          }
        }
      });
    });

    return project;
  }

  async upvoteProject(userId: string, projectId: string): Promise<boolean> {
    let upvote;
    console.log('');

    this.logger.log('Upvoting project with ID: ', projectId);
    await this.prisma.$transaction(async t => {
      const project = await this.prisma.project.findFirst({
        where: { id: projectId }
      });

      if (!project) throw new NotFoundException('Project not found');

      const upvoted = await this.prisma.projectvote.findFirst({
        where: {
          userId,
          projectId
        }
      });

      console.log('Upvoted: ', upvoted);

      if (!upvoted) {
        await this.prisma.projectvote.create({
          data: {
            user: { connect: { id: userId } },
            project: { connect: { id: projectId } },
            type: VoteType.UPVOTE
          }
        });

        await this.prisma.project.update({
          where: {
            id: projectId
          },
          data: {
            likes: { increment: 1 }
          }
        });
      }

      await this.prisma.projectvoteEvents.create({
        data: {
          user: { connect: { id: userId } },
          project: { connect: { id: projectId } },
          type: VoteType.UPVOTE
        }
      });
    });

    return upvote;
  }

  async downvoteProject(userId: string, projectId: string): Promise<boolean> {
    this.logger.log('Upvoting project with ID: ', projectId);
    await this.prisma.$transaction(async t => {
      const project = await this.prisma.project.findFirst({
        where: { id: projectId }
      });

      if (!project) throw new NotFoundException('Project not found');

      const upvoted = await this.prisma.projectvote.findFirst({
        where: {
          projectId,
          userId,
          type: VoteType.UPVOTE
        }
      });

      if (upvoted) {
        await this.prisma.projectvote.delete({
          where: {
            id: upvoted.id
          }
        });

        await this.prisma.project.update({
          where: {
            id: projectId
          },
          data: {
            likes: { decrement: 1 }
          }
        });
      }

      await this.prisma.projectvoteEvents.create({
        data: {
          user: { connect: { id: userId } },
          project: { connect: { id: projectId } },
          type: VoteType.DOWNVOTE
        }
      });
    });

    return true;
  }

  async setVisibility(userId: string, projectId: string, visibility: ProjectVisibility): Promise<Project> {
    this.logger.log('Setting ' + visibility + ' visibility for project: ' + projectId + ' by user with id: ' + userId);
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, createdById: userId }
    });

    console.log('Project: ', project);

    if (!project) throw new NotFoundException('Project not found');
    return await this.prisma.project.update({
      where: { id: projectId, createdById: userId },
      data: { visibility }
    });
  }
}
