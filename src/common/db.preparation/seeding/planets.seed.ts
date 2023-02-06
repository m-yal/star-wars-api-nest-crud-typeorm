import { People } from "src/modules/crud/people/people.entity";
import { Planets } from "src/modules/crud/planets/planets.entity";
import { QueryRunner, Repository } from "typeorm";
import { BaseEntitySeeder } from "./base-entity-seeder";

type PlanetsRelations = {
  name: string,
  residents: string[],
}

export class PlanetsSeeder extends BaseEntitySeeder {
  
  readonly FIRST_PAGE_URL = 'https://swapi.dev/api/planets/?page=1';
  readonly relationsURLs: PlanetsRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {
    "residents": People,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Planets);
  }

  async insertBaseData(data: any) {
    const planet = this.unitRepository.create({
      name: String(data.name),
      url: String(data.url),
      rotation_period: String(data.rotation_period),
      orbital_period: String(data.orbital_period),
      diameter: String(data.diameter),
      climate: String(data.climate),
      gravity: String(data.gravity),
      terrain: String(data.terrain),
      surface_water: String(data.surface_water),
      population: String(data.population),
    })
    await this.unitRepository.save(planet);
  }

  collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      residents: data.residents || [],
    });
  }
}