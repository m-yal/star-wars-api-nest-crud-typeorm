import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Swagger swapi")
    .setDescription("Swapi server UI made with help of Swagger")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("people", app, document);
  await app.listen(process.env.PORT);
  console.log("Server started on port: " + process.env.PORT);
}
bootstrap();