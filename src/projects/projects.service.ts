import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProjectService{
    private logger= new Logger(ProjectService.name)
    constructor(private prisma:PrismaService){}
}