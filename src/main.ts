import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { sessionConfig } from './common/session/config';
import { SwapiSwaggerDocumentBuilder } from './common/swagger/config';
import { swapiValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig: Omit<OpenAPIObject, "paths"> = SwapiSwaggerDocumentBuilder.run();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  app.useGlobalPipes(swapiValidationPipe);
  app.use(session(sessionConfig));

  app.use(passport.initialize());
  app.use(passport.session());

  const port = configService.get<number>('API_PORT');
  await app.listen(port);
  const filesStorageType = configService.get<number>('FILES_STORAGE_TYPE');
  console.log(`Server started on port: ${port}. Files storage type: ${filesStorageType}.`);
}
bootstrap();  