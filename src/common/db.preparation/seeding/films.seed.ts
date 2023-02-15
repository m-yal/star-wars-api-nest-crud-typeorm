import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseUnitsSeeder } from './base-entity-seeder';
import { FilmsRelations } from './common.types';

export class FilmsSeeder extends BaseUnitsSeeder {
  
  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/films/?page=1';
  readonly relationsURLs: FilmsRelations[] = [];
  readonly unitRepository: Repository<Films>;
  readonly RELATIONS_MAP = {
    'characters': People,
    'planets': Planets,
    'starships': Starships,
    'vehicles': Vehicles,
    'species': Species,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Films);
  }

  async insertBaseData(data: any): Promise<void> {
    const film: Films = await this.unitRepository.create({
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