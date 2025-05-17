import { PrismaClient } from "@prisma/client";
import {faker} from "@faker-js/faker"
import { generateNames } from "./utils/names";
import * as argon from "argon2";
import { ROLES } from "../../src/auth/utils/rbac/roles";


export class SeedUsers{
	private static prisma = new PrismaClient();
	static async seed() {
		await this.clear();

		const fakeUsers = await this.generateFakeUsers(500);
		console.log(`Seeding ${fakeUsers.length} users...`)
		
		fakeUsers.forEach(async (user, indx) => {
			console.log(`Creating user ${indx}`)
			await this.prisma.user.upsert({
				where: { email: user.email },
				update: {},
				create: {...user}
			})
		})
        	console.log(`${fakeUsers.length} users seeded`)
    	}


    private static async generateFakeUsers(count: number) {
	    const userList = []

        	const fakeUsers = generateNames(500)
	     console.log(`${count} fake users generated`)
	    
		console.log(`parsing ${count} fake users...`)
		for (let i = 0; i < count; i++){
			const { firstName, lastName, otherNames, gender } = fakeUsers[i]
			const username = faker.internet.username({ firstName, lastName });
			console.log("Parsing user: " + i)
			const fakeUser = {
				firstName,
				lastName,
				otherNames,
				dateOfBirth: faker.date.birthdate({ min: 12, max: 55, mode: 'age' }),
				email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
				gender,
				profilePicture: faker.image.avatar(),
				bio: faker.person.bio(),
				twitterLink: "http://x.com/" + username,
				linkedinLink: "https://www.linkedin.com/in/" + username,
				facebookLink: "https://www.facebook.com/" + username,
				githubUsername: "https://github.com/" + username,
				gitlabUsername: "https://gitlab.com/" + username,
				website: "http://" + username + ".com",
				location: faker.location.city(),
				createdAt: new Date(Date.now()),
				updatedAt: new Date(Date.now()),
				passwordHash:  await argon.hash("password"),
				passwordResetToken: null,
				passwordResetExpires: null,
				passwordChangedAt: new Date(Date.now()),
				accountIsActivated: true,
				accountActivationToken: null,
				accountActivationExpires: null,
				accountActivatedAt: new Date(Date.now() + 2 * 1000),
				role: ROLES.USER
			}
			userList.push(fakeUser)
		}
		console.log("Done")

		return userList;	
    }
	
	private static async clear() {
		console.log("Clearing all user data...")
		await this.prisma.user.deleteMany();
		console.log("Done clearing all data.")
	}

}