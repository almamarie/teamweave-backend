import { PrismaClient, ProjectVisibility } from "@prisma/client";
import fakeProjects from "./utils/projects.json"
import { faker } from "@faker-js/faker";

export class SeedProjects{
    static prisma = new PrismaClient()
    constructor() {
        console.log("Fake projects fetched: " + fakeProjects.length)
    }
    
    static async seed() {
        try {
            const parsedProjects = await this.parseProjects();
            this.seedData(parsedProjects)
        } catch {
            (async (e: any) => {
        console.error(e);
        await this.prisma.$disconnect();
        process.exit(1);
    })}
    }

    private static async parseProjects () {
        const userIds = await this.getUserIds()

        return fakeProjects.map(project => {
            return {
                name: project.name,
                description: project.description,
                createdById: faker.helpers.arrayElement(userIds).id,
               
                
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),

                // milestones      Milestone[]
                // journeyMaps     JourneyMap[]
                // uiuxDesigns     UIUXDesign[]
                // frontends       Frontend[]
                // backends        Backend[]
                // fullstacks      Fullstack[]
                // activityEvents  ActivityEvent[]
                // projectComments ProjectComment[]
                // projectUpvotes  Projectvote[]
                // userStories     UserStory[]
                
                likes:           faker.number.int({min: 0, max: userIds.length}),
                visibility:      ProjectVisibility.PUBLIC
            }
        })
    }

    private static async getUserIds() {
        const users = await this.prisma.user.findMany(
            {
                select: { id: true }
            })
        console.log(`${users.length} user fetched.`)
        return users;
    }

    private static seedData(parsedProjects: any[]) {
        console.log(`Seeding ${parsedProjects.length} projects`);
        
        parsedProjects.forEach(async (project, indx) => {
            console.log(`Seeding project ${indx} wih title ` + project.name)
            // console.log("Project: " + JSON.stringify(project))

            const { createdById, ...userData } = project;

            try {
                await this.prisma.project.upsert({
                    where: {
                        name: project.name
                    },
                    update: {},

                    create: {...userData, createdBy: {connect: {id: createdById}}}
                })

                const user = await this.prisma.user.update({
                    where: { id: project.createdById },
                    data: {projectsCount: {increment: 1}}
                })

                if (indx % 50 === 0) {
                    console.log("User " + indx + user)
                }
            } catch (error) {
                console.error("Error: ", project)
            }
        })

        console.log("Done seeding data.")
    }
}
