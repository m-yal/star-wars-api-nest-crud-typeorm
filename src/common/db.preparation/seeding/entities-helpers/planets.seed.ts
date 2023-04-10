import { QueryRunner, Repository } from "typeorm";

import { Person } from "../../../../modules/units/people/people.entity";
import { Planet } from "../../../../modules/units/planets/planets.entity";
import { PlanetsRelations } from "../types";
import { BaseUnitsSeeder } from "./base-entity-seeder";

export class PlanetsSeeder extends BaseUnitsSeeder {
  
  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/planets/?page=1';
  readonly relationsURLs: PlanetsRelations[] = [];
  readonly unitRepository: Repository<Planet>;
  readonly RELATIONS_MAP = {
    "residents": Person,
  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Planet);
  }

  async insertBaseData(data: any): Promise<void> {
    const planet: Planet = await this.unitRepository.create({
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