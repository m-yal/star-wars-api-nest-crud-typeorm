import { INestApplication, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/global.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { sessionConfig } from './common/session/config';
import { SwapiSwaggerDocumentBuilder } from './common/swagger/config';
import { ConfigService } from '@nestjs/config';
import { swapiValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig: Omit<OpenAPIObject, "paths"> = SwapiSwaggerDocumentBuilder.run();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  // app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(swapiValidationPipe);
  app.use(session(sessionConfig));

  app.use(passport.initialize());
  app.use(passport.session());

  const port = configService.get<number>('API_PORT');
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
}
bootstrap();  