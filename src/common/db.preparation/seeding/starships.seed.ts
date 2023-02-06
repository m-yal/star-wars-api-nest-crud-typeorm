import { Starships } from 'src/modules/crud/starships/starships.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseEntitySeeder } from './base-entity-seeder';

type StarshipsRelations = {
  name: string,
}

export default class StarshipsSeeder extends BaseEntitySeeder {

  readonly FIRST_PAGE_URL = 'https://swapi.dev/api/starships/?page=1';
  readonly relationsURLs: StarshipsRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Starships);
  }

  async insertBaseData(data: any) {
    const starhip = this.unitRepository.create({
      name: String(data.name),
      url: String(data.url),
      model: String(data.model),
      manufacturer: String(data.manufacturer),
      cost_in_credits: String(data.cost_in_credits),
      length: String(data.length),
      max_atmosphering_speed: String(data.max_atmosphering_speed),
      crew: String(data.crew),
      passengers: String(data.passengers),
      cargo_capacity: String(data.cargo_capacity),
      consumables: String(data.consumables),
      hyperdrive_rating: String(data.hyperdrive_rating),
      MGLT: String(data.MGLT),
      starship_class: String(data.starship_class),
    })
    await this.unitRepository.save(starhip);
  }

  collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
    });
  }
}