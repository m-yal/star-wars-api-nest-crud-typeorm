import { DataSource, DataSourceOptions } from "typeorm";

class DataSourceForSeeding {

    private readonly dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        database: "swapi",
        port: 3306,
        host: "localhost",
        username: "root",
        password: "123321",
        entities: ["dist/**/*.entity*{.ts,.js}"],
        migrations: ["dist/database/seeder{.ts,.js}"],
    }

    private readonly dataSource: DataSource = new DataSource(this.dataSourceOptions);

    getDataSource(): DataSource {
        return this.dataSource;
    }
}

export default new DataSourceForSeeding().getDataSource();