import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle("Swagger swapi")
    .setDescription("Swapi server UI made with help of Swagger")
    .setVersion("2.0")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);
  await app.listen(process.env.API_PORT);
  console.log("Server started on port: " + process.env.API_PORT);
}
bootstrap();  