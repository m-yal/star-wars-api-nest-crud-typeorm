import { QueryRunner, Repository } from 'typeorm';

import { Person } from '../../../../modules/units/people/people.entity';
import { Specie } from '../../../../modules/units/species/species.entity';
import { Starship } from '../../../../modules/units/starships/starships.entity';
import { Vehicle } from '../../../../modules/units/vehicles/vehicles.entity';
import { PeopleRelations } from '../types';
import { BaseUnitsSeeder } from './base-entity-seeder';

export default class PeopleSeeder extends BaseUnitsSeeder {
  
  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/people/?page=1';
  readonly relationsURLs: PeopleRelations[] = [];
  readonly unitRepository: Repository<Person>;
  readonly RELATIONS_MAP = {
    species: Specie,
    vehicles: Vehicle,
    starships: Starship,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Person);
  }

  async insertBaseData(data: any) {
    const person: Person = await this.unitRepository.create({
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