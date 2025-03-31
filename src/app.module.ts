import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "./utils/logger.middleware";
import { EmailModule } from './email/email.module';
import { AdminAuthModule } from './admin/auth/admin-auth.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule, AuthModule, UserModule, PrismaModule, AdminAuthModule],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
