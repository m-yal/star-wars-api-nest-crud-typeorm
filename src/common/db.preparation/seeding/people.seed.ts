import { People } from 'src/modules/crud/people/people.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseEntitySeeder } from './base-entity-seeder';

type PeopleRelations = {
  name: string,
  species: string[],
  vehicles: string[],
  starships: string[],
}

export default class PeopleSeeder extends BaseEntitySeeder {
  
  readonly FIRST_PAGE_URL = 'https://swapi.dev/api/people/?page=1';
  readonly relationsURLs: PeopleRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {
    species: Species,
    vehicles: Vehicles,
    starships: Starships,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(People);
  }

  async insertBaseData(data: any) {
    const person = await this.unitRepository.create({
      name: String(data.name),
      url: String(data.url),
      height: String(data.height),
      mass: String(data.mass),
      hair_color: String(data.hair_color),
      skin_color: String(data.skin_color),
      eye_color: String(data.eye_color),
      birth_year: String(data.birth_year),
      gender: String(data.gender),
    });
    await this.unitRepository.save(person);
  }

  collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      species: data.species || [],
      vehicles: data.vehicles || [],
      starships: data.starships || [],
    });
  }
}