import { QueryRunner, Repository } from 'typeorm';

import { Film } from '../../../../modules/units/films/films.entity';
import { Person } from '../../../../modules/units/people/people.entity';
import { Planet } from '../../../../modules/units/planets/planets.entity';
import { Specie } from '../../../../modules/units/species/species.entity';
import { Starship } from '../../../../modules/units/starships/starships.entity';
import { Vehicle } from '../../../../modules/units/vehicles/vehicles.entity';
import { FilmsRelations } from '../types';
import { BaseUnitsSeeder } from './base-entity-seeder';

export class FilmsSeeder extends BaseUnitsSeeder {
  
  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/films/?page=1';
  readonly relationsURLs: FilmsRelations[] = [];
  readonly unitRepository: Repository<Film>;
  readonly RELATIONS_MAP = {
    'characters': Person,
    'planets': Planet,
    'starships': Starship,
    'vehicles': Vehicle,
    'species': Specie,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Film);
  }

  async insertBaseData(data: any): Promise<void> {
    const film: Film = await this.unitRepository.create({
      name: String(data.title),
      url: String(data.url),
      episode_id: String(data.episode_id),
      opening_crawl: String(data.opening_crawl),
      director: String(data.director),
      producer: String(data.producer),
      release_date: Number.isNaN(Date.parse(data.release_date)) ? new Date(Date.now()) : new Date(data.release_date),
    });
    await this.unitRepository.save(film);
  }

  collectRelationsURLs(data: any): void {
    this.relationsURLs.push({
      name: data.title,
      characters: data.characters || [],
      planets: data.planets || [],
      starships: data.starships || [],
      vehicles: data.vehicles || [],
      species: data.species || [],
    });
  }
}