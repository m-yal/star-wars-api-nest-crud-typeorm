import { DataSource } from 'typeorm';
import { People } from './entities/people.entity';

export const peopleProviders = [
  {
    provide: 'PEOPLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(People),
    inject: ['DATA_SOURCE'],
  },
];