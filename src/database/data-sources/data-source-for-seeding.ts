import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

config();

class DataSourceForSeeding {

    private readonly dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        database: process.env.DB_NAME,
        port: +process.env.DB_PORT,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        entities: ["dist/**/*.entity*{.ts,.js}"],
        migrations: ["dist/database/seeder{.ts,.js}"],
    }

    private readonly dataSource: DataSource = new DataSource(this.dataSourceOptions);

    getDataSource(): DataSource {
        return this.dataSource;
    }
}

export default new DataSourceForSeeding().getDataSource();