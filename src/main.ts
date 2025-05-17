import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CatchEverythingFilter } from './filters/global-error.filters';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const httpAdapterHost = app.get(HttpAdapterHost);
  // app.enableCors({
  //   origin: configService.get("FRONTEND_URL"),
  //   credentials: true,
  // });
  app.enableCors({
    origin: '*', // Allow all domains (adjust as needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization', // Adjust headers as needed
  });
  if (!httpAdapterHost || !httpAdapterHost.httpAdapter) {
    throw new Error("HttpAdapter not found!");
  }
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle("Teamweave API")
    .setDescription("Teamweave API description")
    .setVersion("1.0")
    .addTag("Teamweave")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation/api', app, documentFactory);
  app.setGlobalPrefix('api/v0');
  await app.listen(3333);
}
bootstrap();
