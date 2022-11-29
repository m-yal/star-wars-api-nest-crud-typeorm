import { HttpService } from '@nestjs/axios';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { SeedingService } from './database/seeding.service';

async function bootstrap() {
  const app = await NestFactory.create(DatabaseModule);
  await app.listen(process.env.PORT);
  console.log("Server started for seeding on port: " + process.env.PORT);

  const data = await new SeedingService(new HttpService()).downloadRawDataToDB();
  console.log("response from external api " + JSON.stringify(data));

  await app.close();
}
bootstrap();