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
  await app.listen(3005);
  console.log(JSON.stringify({
    name: "me",
    height: 12311,
    mass: 12311,
    hair_color: "asdasd",
    skin_color: "strinsfsdfsdf",
    eye_color: "adadwqd",
    birth_year: "dfsdfsdfsd",
    gender: "avxcvxcvx",
    homeworld: "sdfsdfsf",
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: "",
    edited: "",
    url: "",
}));
  
}
bootstrap();
