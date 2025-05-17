import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
import { ROLES } from "../../src/auth/utils/rbac/roles";


export default class SeedAdmins{
    private static prisma = new PrismaClient();

    static async  seed() {
        console.log('Creating Super admin...');
        const superAdminPasswordHash = await argon.hash('x56#762.su/5');
        await this.prisma.adminUser.upsert({
            where: {
            email: 'super67@teamweave.com'
            },
            update: {},
            create: {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'super67@teamweave.com',
            passwordHash: superAdminPasswordHash,
            passwordIsSet: true,
            role: ROLES.SUPER_ADMIN,
            accountIsActivated: true
            }
        });
        console.log('Super admin user created');

        console.log('Creating admin user...');
        const adminPasswordHash = await argon.hash('90he,6y0');
        await this.prisma.adminUser.upsert({
            where: {
            email: 'vi-admin@teamweave.com'
            },
            update: {},
            create: {
            firstName: 'default',
            lastName: 'admin',
            email: 'vi-admin@teamweave.com',
            passwordHash: adminPasswordHash,
            passwordIsSet: true,
            role: ROLES.ADMIN,
            accountIsActivated: true
            }
        });
        console.log('Admin user created');
    }
}