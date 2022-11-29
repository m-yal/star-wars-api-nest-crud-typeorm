import { DataSource, DataSourceOptions } from "typeorm";

//Uses during typeorm work for seeding and migrations
const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    database: "swapi",
    port: 3306,
    host: "localhost",
    username: "root",
    password: "123321",
    entities: [__dirname + "../**/*.entity.js"],
    migrations: ["dist/db/migrations/*.js"]
}

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });
export default dataSource;