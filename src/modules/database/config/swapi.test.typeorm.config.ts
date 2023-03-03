import { ConfigModule } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "aws-sdk";
import { Users } from "../../auth/entities/users.entity";
import { Films } from "../../crud/films/films.entity";
import { People } from "../../crud/people/people.entity";
import { Planets } from "../../crud/planets/planets.entity";
import { Species } from "../../crud/species/species.entity";
import { Starships } from "../../crud/starships/starships.entity";
import { Vehicles } from "../../crud/vehicles/vehicles.entity";
import { Files } from "../../files/file.entity";

export const typeOrmTestAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      database: process.env.TEST_DB_NAME,
      password: process.env.DB_PASSWORD,
      entities: [
        People, Films, Planets, 
        Species, Starships, Vehicles,
        Files, Users,
      ],
      synchronize: false,
    };
  },
};