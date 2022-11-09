import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/db/database.module';
import { People } from './entities/people.entity';
import { PeopleController } from './people.controller';
import { peopleProviders } from './people.providers';
import { PeopleService } from './people.service';

@Module({
  imports: [TypeOrmModule.forFeature([People]), /*DatabaseModule*/],
  controllers: [PeopleController],
  providers: [PeopleService, /*...peopleProviders*/]
})
export class PeopleModule {
  constructor(private peopleService: PeopleService) {}
}
