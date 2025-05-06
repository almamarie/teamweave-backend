import { ProjectService } from "./projects.service";
import { Controller } from "@nestjs/common";

@Controller('projects')
export class ProjectsController {
    constructor(private service:ProjectService){}
}