import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Users } from "../../modules/auth/entities/users.entity";
import { Films } from "../../modules/crud/films/films.entity";
import { People } from "../../modules/crud/people/people.entity";
import { Planets } from "../../modules/crud/planets/planets.entity";
import { Species } from "../../modules/crud/species/species.entity";
import { Starships } from "../../modules/crud/starships/starships.entity";
import { Vehicles } from "../../modules/crud/vehicles/vehicles.entity";
import { Files } from "../../modules/files/entities/file.entity";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: configService.get(`NODE_ENV`) === `test` ? configService.get(`TEST_DB_HOST`) : configService.get(`DB_HOST`),
      database: configService.get(`NODE_ENV`) === `test` ? configService.get(`TEST_DB_NAME`) : configService.get(`DB_NAME`),
      port: configService.get(`NODE_ENV`) === `test` ? configService.get(`TEST_DB_PORT`) : configService.get(`DB_PORT`),
      username: configService.get(`DB_USERNAME`),
      password: configService.get(`DB_PASSWORD`),
      entities: [
        People, Films, Planets, 
        Species, Starships, Vehicles,
        Files, Users,
      ],
      synchronize: false,
    };
  },
};