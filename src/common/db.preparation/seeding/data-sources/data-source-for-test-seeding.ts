import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

import { TestSeeder } from "../test.seeder.entry.point";

config();
const { env } = process;

class DataSourceForTestSeeding {

    private readonly dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        database: env.TEST_DB_NAME,
        port: +env.DB_PORT,
        host: env.DB_HOST,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        entities: [env.ENTITIES_PROJECT_PATH],
        migrations: [TestSeeder],
    }

    private readonly dataSource: DataSource = new DataSource(this.dataSourceOptions);

    getDataSource(): DataSource {
        return this.dataSource;
    }
}

export default new DataSourceForTestSeeding().getDataSource();