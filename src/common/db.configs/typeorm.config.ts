import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { Users } from "../../modules/auth/entities/users.entity";
import { Film } from "../../modules/units/films/films.entity";
import { Person } from "../../modules/units/people/people.entity";
import { Planet } from "../../modules/units/planets/planets.entity";
import { Specie } from "../../modules/units/species/species.entity";
import { Starship } from "../../modules/units/starships/starships.entity";
import { Vehicle } from "../../modules/units/vehicles/vehicles.entity";
import { File } from "../../modules/files/file.entity";

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
        Person, Film, Planet, 
        Specie, Starship, Vehicle,
        File, Users,
      ],
      synchronize: false,
    };
  },
};