import { ProjectVisibility } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class ProjectVisibilityDto {
  @IsEnum(ProjectVisibility)
  @IsNotEmpty()
  visibility: ProjectVisibility;
}