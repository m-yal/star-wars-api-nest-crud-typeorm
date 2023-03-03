import { QueryRunner, Repository } from 'typeorm';
import { Planets } from '../../../modules/crud/planets/planets.entity';
import { Species } from '../../../modules/crud/species/species.entity';
import { BaseUnitsSeeder } from './base-entity-seeder';
import { SpeciesRelations } from './types';

export class SpeciesSeeder extends BaseUnitsSeeder {

  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/species/?page=1';
  readonly relationsURLs: SpeciesRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {
    "homeworld": Planets,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Species);
  }

  async insertBaseData(data: any): Promise<void> {
    const specie: Species = await this.unitRepository.create({
      name: String(data.name),
      url: String(data.url),
      classification: String(data.classification),
      designation: String(data.designation),
      average_height: String(data.average_height),
      skin_colors: String(data.skin_colors),
      hair_colors: String(data.hair_colors),
      eye_colors: String(data.eye_colors),
      average_lifespan: String(data.average_lifespan),
      language: String(data.language),
    })
    await this.unitRepository.save(specie);
  }

  collectRelationsURLs(data: any): void {
    this.relationsURLs.push({
      name: data.name,
      homeworld: data.homeworld,
    });
  }
}