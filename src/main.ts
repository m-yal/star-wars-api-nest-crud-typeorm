import { INestApplication, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/global.filter';
import * as session from 'express-session';
import * as passport from 'passport';
import { sessionConfig } from './common/session/config';
import { SwapiSwaggerDocumentBuilder } from './common/swagger/config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  
  const swaggerConfig: Omit<OpenAPIObject, "paths"> = SwapiSwaggerDocumentBuilder.run();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger", app, document);

  // app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errorMessage = validationErrors
          .map((error) => {
            return `${error.property} has wrong value ${error.value} ${Object.values(error.constraints).join(', ')}`;
          })
          .join(', ');

        return new UnprocessableEntityException(errorMessage);
      },
    }),
  );
  app.use(session(sessionConfig));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  const port = process.env.API_PORT;
  await app.listen(port);
  console.log(`Server started on port: ${port}`);
}
bootstrap();  