import { DataSource, DataSourceOptions } from "typeorm";

class DataSourceForCreatingTables {

    private readonly dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        database: "swapi",
        port: 3306,
        host: "localhost",
        username: "root",
        password: "123321",
        entities: ["dist/**/*.entity*{.ts,.js}"],
        migrations: ["dist/database/migrations-for-creating-tables/*{.ts,.js}"],
    }

    private readonly dataSource: DataSource = new DataSource(this.dataSourceOptions);

    getDataSource(): DataSource {
        return this.dataSource;
    }
}

export default new DataSourceForCreatingTables().getDataSource();