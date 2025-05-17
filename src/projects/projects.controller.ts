import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProjectService } from './projects.service';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { GeneralResponseEntity } from 'src/entities/';
import { Project } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { CreateProjectDto, ProjectVisibilityDto, UpdateProjectDto } from './dto';
import { PROJECT_PERMISSIONS } from 'src/auth/utils/rbac/permissions';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateResponse } from 'src/entities/create-response.entity';
import { formatUser } from 'src/auth/utils/format-user';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('projects')
@UseGuards(JwtGuard, RolesGuard)
export class ProjectsController {
  private logger = new Logger(ProjectsController.name);

  constructor(private service: ProjectService) {}

  @Public()
  @Get('public')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project[]>
  })
  async getAllPublicProjects(): Promise<GeneralResponseEntity<Project[]>> {
    const projects = await this.service.getAllPublicProjects();

    return CreateResponse(true, 'Projects retrieved', projects, projects.length);
  }

  @Public()
  @Get('public/:projectId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project>
  })
  async getPublicProjectById(@Param('projectId') projectId: string): Promise<GeneralResponseEntity<Project>> {
    const project = await this.service.getPublicProjectById(projectId);

    return CreateResponse(true, 'Project retrieved', project);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project[]>
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.GET_OWN])
  async getUserProjects(@GetUser('id') userId: string): Promise<GeneralResponseEntity<Project[]>> {
    console.log('Getting user projects .....');
    const project = await this.service.getUserProjects(userId);

    return CreateResponse(true, 'Project retrieved', project);
  }

  @Get('user/:projectId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project>
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.GET_OWN])
  async getUserProjectById(@GetUser('id') userId: string, @Param('projectId') projectId: string): Promise<GeneralResponseEntity<Project>> {
    this.logger.log('Get user project route called');
    const project = await this.service.getUserProjectById(userId, projectId);

    return CreateResponse(true, 'Project retrieved', project);
  }

  @Post('new')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project>
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.CREATE])
  async createProject(@GetUser('id') userId: string, @Body() data: CreateProjectDto): Promise<GeneralResponseEntity<Project>> {
    this.logger.log('Create project route called.');
    const project = await this.service.createProject(userId, data);
    return CreateResponse(true, 'Project created', project);
  }

  @Patch(':projectId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project>
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.UPDATE_OWN])
  async updateProject(@GetUser('id') userId: string, @Param('projectId') projectId: string, @Body() data: UpdateProjectDto): Promise<GeneralResponseEntity<Project>> {
    this.logger.log('Update project route called.');
    console.log('Controller data: ', data);
    if (Object.keys(data).length === 0) throw new BadRequestException('Update data not provided.');

    const project = await this.service.updateProject(userId, projectId, data);
    return CreateResponse(true, 'Project updated successfully', project);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.DELETE_OWN])
  async deleteProject(@GetUser('id') userId: string, @Param('projectId') projectId: string) {
    this.logger.log('Delete project route called.');
    const project = await this.service.deleteProject(userId, projectId);
    return CreateResponse(true, 'Project deleted successfully', project);
  }

  @Patch(':projectId/upvote')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity<Project>
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.UPDATE_OTHER])
  async upvoteProject(@GetUser('id') userId: string, @Param('projectId') projectId: string): Promise<GeneralResponseEntity> {
    this.logger.log('Upvote project route called.');
    await this.service.upvoteProject(userId, projectId);
    return CreateResponse(true, 'Project upvoted successfully');
  }

  @Patch(':projectId/downvote')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.UPDATE_OTHER])
  async downvoteProject(@GetUser('id') userId: string, @Param('projectId') projectId: string): Promise<GeneralResponseEntity> {
    this.logger.log('Upvote project route called.');
    await this.service.downvoteProject(userId, projectId);
    return CreateResponse(true, 'Project downvoted successfully');
  }

  @Patch(':projectId/visibility')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: GeneralResponseEntity
  })
  @SetMetadata('permissions', [PROJECT_PERMISSIONS.DELETE_OWN])
  async updateProjectVisibility(@GetUser('id') userId: string, @Param('projectId') projectId: string, @Body() data: ProjectVisibilityDto): Promise<GeneralResponseEntity> {
    this.logger.log('Upvote project route called.');
    await this.service.setVisibility(userId, projectId, data.visibility);
    return CreateResponse(true, 'Project visibility: ' + data.visibility.toLowerCase());
  }
}
