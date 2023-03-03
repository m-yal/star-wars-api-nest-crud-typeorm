import { QueryRunner, Repository } from "typeorm";
import { People } from "../../../modules/crud/people/people.entity";
import { Planets } from "../../../modules/crud/planets/planets.entity";
import { BaseUnitsSeeder } from "./base-entity-seeder";
import { PlanetsRelations } from "./types";

export class PlanetsSeeder extends BaseUnitsSeeder {
  
  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/planets/?page=1';
  readonly relationsURLs: PlanetsRelations[] = [];
  readonly unitRepository: Repository<Planets>;
  readonly RELATIONS_MAP = {
    "residents": People,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Planets);
  }

  async insertBaseData(data: any): Promise<void> {
    const planet: Planets = await this.unitRepository.create({
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

  collectRelationsURLs(data: any): void {
    this.relationsURLs.push({
      name: data.name,
      residents: data.residents || [],
    });
  }
}