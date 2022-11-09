import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123321',
        database: 'swapi',
        entities: [
            __dirname + '/../../**/*.entity.js',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];