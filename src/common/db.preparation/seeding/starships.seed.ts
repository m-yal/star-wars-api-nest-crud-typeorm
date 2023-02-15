import { Starships } from 'src/modules/crud/starships/starships.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseUnitsSeeder } from './base-entity-seeder';
import { StarshipsRelations } from './common.types';

export default class StarshipsSeeder extends BaseUnitsSeeder {

  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/starships/?page=1';
  readonly relationsURLs: StarshipsRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Starships);
  }

  async insertBaseData(data: any): Promise<void> {
    const starhip: Starships = await this.unitRepository.create({
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
    await this.unitRepository.save(await starhip);
  }

  collectRelationsURLs(data: any): void {
    this.relationsURLs.push({
      name: data.name,
    });
  }
}