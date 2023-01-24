import { Films } from "src/modules/crud/films/films.entity";
import { People } from "src/modules/crud/people/people.entity";
import { Planets } from "src/modules/crud/planets/planets.entity";
import { DataSource } from "typeorm";
import axios from 'axios';

type PlanetsRelations = {
  name: string,
  residents: string[],
  films: string[],
}

export class PlanetsSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/planets/?page=1';
  private readonly relationsURLs: PlanetsRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async planetRelations => {
      const planetsRepository = await this.dataSource.getRepository(Planets)
      const planet: Planets = await planetsRepository.findOneBy({ name: planetRelations.name });
      await this.queryRelatedEntities(planet, planetRelations);
      await planetsRepository.save(planet);
    });
  }



  private async queryRelatedEntities(planet: Planets, planetRelations: PlanetsRelations) {
    const relationFieldName = ["residents", "films"];
    const entityType = [People, Films];
    for (let i = 0; i < relationFieldName.length; i++) {
      planetRelations[relationFieldName[i]].forEach(async (url: string) => {
        planet[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
      });
    }
  }

  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await axios.get(pageURL);
    await this.insertBaseData(data);
    this.collectRelationsURLs(data);
    if (data.next) {
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Planets)
      .values({
        name: data.name,
        url: data.url,
        rotation_period: Number.isNaN(+data.rotation_period)
          ? null
          : +data.rotation_period,
        orbital_period: !Number.isNaN(+data.orbital_period)
          ? +data.orbital_period
          : null,
        diameter: !Number.isNaN(+data.diameter)
          ? +data.diameter
          : null,
        climate: data.climate,
        gravity: data.gravity,
        terrain: data.terrain,
        surface_water: !Number.isNaN(+data.surface_water)
          ? +data.surface_water
          : null,
        population: !Number.isNaN(+data.population)
          ? +data.population
          : null,
      })
      .execute();
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      residents: data.residents,
      films: data.films,
    });
  }
}