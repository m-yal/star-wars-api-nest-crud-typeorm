import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { People } from "src/people/entities/people.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    // port: 3005,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [People],
    migrationsTableName: "swapi",
    migrations: [],
    synchronize: true,
}