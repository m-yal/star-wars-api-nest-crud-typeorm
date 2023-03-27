import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';

config();
const { env } = process;

class DataSourceForCreatingTables {

    private readonly dataSourceOptions: DataSourceOptions = {
        type: "mysql",
        database: env.TEST_DB_NAME,
        port: +env.TEST_DB_PORT,
        host: env.TEST_DB_HOST,
        username: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        entities: [env.ENTITIES_PROJECT_PATH],
        migrations: [env.TEST_MIGRATION_PROJECT_PATH],
    }

    private readonly dataSource: DataSource = new DataSource(this.dataSourceOptions);

    getDataSource(): DataSource {
        return this.dataSource;
    }
}

export default new DataSourceForCreatingTables().getDataSource();