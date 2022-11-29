import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Films } from "src/crud/entities/films.entity";
import { People } from "src/crud/entities/people.entity";
import { Planets } from "src/crud/entities/planets.entity";
import { Species } from "src/crud/entities/species.entity";
import { Starships } from "src/crud/entities/starships.entity";
import { Vehicles } from "src/crud/entities/vehicles.entity";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
      return {
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        entities: [People, Films, Planets, Species, Starships, Vehicles],
        synchronize: false,
      };
    },
  };