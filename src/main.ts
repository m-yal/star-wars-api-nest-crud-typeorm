import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/global.filter';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  
  const swaggerConfig: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle("Swagger swapi")
    .setDescription("Swapi server UI made with help of Swagger")
    .setVersion("2.0")
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  
  app.use(session({
    secret: "thesecret", //put into .env files 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
  }))
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(process.env.API_PORT);
  console.log("Server started on port: " + process.env.API_PORT);
}
bootstrap();  