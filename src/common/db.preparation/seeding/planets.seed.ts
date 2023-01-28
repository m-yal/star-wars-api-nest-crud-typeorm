import { People } from "src/modules/crud/people/people.entity";
import { Planets } from "src/modules/crud/planets/planets.entity";
import { QueryRunner } from "typeorm";
import { firstValueFrom } from 'rxjs';
import { HttpService } from "@nestjs/axios";

type PlanetsRelations = {
  name: string,
  residents: string[],
  // films: string[],
}

export class PlanetsSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/planets/?page=1';
  private readonly relationsURLs: PlanetsRelations[] = [];
  private readonly httpService = new HttpService();
  private queryRunner: QueryRunner;
  private readonly RELATION_FIELD_ENTITY_MAP = {
    "residents": People, 
    // "films": Films,
  }

  public async baseDataSeed(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("relationsURLs " + JSON.stringify(this.relationsURLs));

  }

  public async setRelations(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    const planetsRepository = await this.queryRunner.manager.getRepository(Planets)
    const promises = this.relationsURLs.map(async planetRelations => {
      const planet: Planets = await planetsRepository.findOneBy({ name: planetRelations.name });
      await this.queryRelatedEntities(planet, planetRelations);
      await planetsRepository.save(planet);
    })
    await Promise.all(promises);
  }



  private async queryRelatedEntities(planet: Planets, planetRelations: PlanetsRelations) {
    const relationFeildsNames: string[] = Object.keys(this.RELATION_FIELD_ENTITY_MAP);
    const promises = relationFeildsNames.map(async (relationFieldName: string) => {
      planet[relationFieldName] = [];
      const relatedUnitURLs: string[] = planetRelations[relationFieldName] || [];
      const promises = relatedUnitURLs.map(async (url: string): Promise<void> => {
        return await planet[relationFieldName].push(await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP[relationFieldName], { url }));
      })
      await Promise.all(promises);
    })
    await Promise.all(promises);
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
    await this.queryRunner.manager.save(Planets, {
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
    });
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      residents: data.residents,
      // films: data.films,
    });
  }
}