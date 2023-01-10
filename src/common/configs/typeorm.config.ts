import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/modules/auth/config/entities/user.entity";
import { Films } from "src/modules/crud/config/entities/films.entity";
import { People } from "src/modules/crud/config/entities/people.entity";
import { Planets } from "src/modules/crud/config/entities/planets.entity";
import { Species } from "src/modules/crud/config/entities/species.entity";
import { Starships } from "src/modules/crud/config/entities/starships.entity";
import { Vehicles } from "src/modules/crud/config/entities/vehicles.entity";
import { FilmsImage, PeopleImage, PlanetsImage, SpeciesImage, StarshipsImage, VehiclesImage } from "src/modules/files/config/entities/image.entity";

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
        entities: [
          People, Films, Planets, 
          Species, Starships, Vehicles,
          PeopleImage, FilmsImage, PlanetsImage,
          SpeciesImage, StarshipsImage, VehiclesImage,
          User,
        ],
        synchronize: false,
      };
    },
  };