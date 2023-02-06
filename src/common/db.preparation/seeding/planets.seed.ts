import { People } from "src/modules/crud/people/people.entity";
import { Planets } from "src/modules/crud/planets/planets.entity";
import { QueryRunner, Repository } from "typeorm";
import { firstValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios";

type PlanetsRelations = {
  name: string,
  residents: string[],
}

export class PlanetsSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/planets/?page=1';
  private readonly relationsURLs: PlanetsRelations[] = [];
  private readonly httpService = new HttpService();

  private queryRunner: QueryRunner;
  private planetsRepository: Repository<Planets>;
  
  private readonly RELATIONS_MAP = {
    "residents": People,
  }

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
    this.planetsRepository = this.queryRunner.manager.getRepository(Planets);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    const relationsFieldsNames = Object.keys(this.RELATIONS_MAP);
    for await (const planetRelationsUrls of this.relationsURLs) {
      const planet = await this.planetsRepository.findOne({
        where: { name: planetRelationsUrls.name },
        relations: relationsFieldsNames,
      })
      for await (const relationFieldName of relationsFieldsNames) {
        const relatedUnits = await this.getRelatedUnit(planetRelationsUrls[relationFieldName], relationFieldName);
        planet[relationFieldName] = relatedUnits;
      }
      await this.planetsRepository.save(planet);
    }
  }



  private async getRelatedUnit(unitUrls: string[], relationFieldname: string) {
    const units = [];
    const relatedUnitRepository = this.queryRunner.manager.getRepository(this.RELATIONS_MAP[relationFieldname]);
    const unresolvedPromises = unitUrls.map(async unitUrl => {
      const unit = await relatedUnitRepository.findOneBy({ url: unitUrl });
      units.push(unit);
    })
    await Promise.all(unresolvedPromises);
    return units;
  }

  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.get<any>(pageURL));
    const promises = data.results.map(async unit => {
      await this.insertBaseData(unit);
      this.collectRelationsURLs(unit);
    })
    await Promise.all(promises);
    if (data.next) {
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    const planet = this.planetsRepository.create({
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
    await this.planetsRepository.save(planet);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      residents: data.residents || [],
    });
  }
}