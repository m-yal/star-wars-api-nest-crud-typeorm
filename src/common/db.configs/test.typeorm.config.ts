import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";

import { Users } from "../../modules/auth/entities/users.entity";
import { Films } from "../../modules/crud/films/films.entity";
import { People } from "../../modules/crud/people/people.entity";
import { Planets } from "../../modules/crud/planets/planets.entity";
import { Species } from "../../modules/crud/species/species.entity";
import { Starships } from "../../modules/crud/starships/starships.entity";
import { Vehicles } from "../../modules/crud/vehicles/vehicles.entity";
import { Files } from "../../modules/files/entities/file.entity";

config();

export const testTypeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
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