import { SeedUsers } from "./seed-users";
import { SeedProjects } from "./seed-projects";
import fakeProjects from "./utils/projects.json";
import SeedAdmins from "./seed-admins";
import { PrismaClient } from "@prisma/client";


class Seed {
	private prisma = new PrismaClient();
	constructor() {
		console.log("Fake projects: ", fakeProjects.length)
	}
	async start() {
		this.beforeAll()
		this.run()
	}
	
	private async run() {
		await SeedAdmins.seed()
		await SeedUsers.seed();
		// await SeedProjects.seed()
	}

	private async beforeAll() {
		await this.prisma.project.deleteMany()
		await this.prisma.user.deleteMany()
		await this.prisma.adminUser.deleteMany()
	}

}

const seedClass = new Seed();

seedClass.start()