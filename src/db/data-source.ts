import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    database: "swapi",
    host: "localhost",
    username: "root",
    password: "123321",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;