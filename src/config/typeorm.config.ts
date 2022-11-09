import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { People } from "src/people/entities/people.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: "localhost",
    username: "root",
    password: "123321",
    database: "swapi",
    entities: [People],
    migrationsTableName: "migrations",
    migrations: [],
    synchronize: true,
}