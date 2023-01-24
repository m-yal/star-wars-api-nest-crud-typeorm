import axios from 'axios';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { DataSource } from 'typeorm';

// Relations urls
type FilmsRelations = {
  name: string,
  characters: string[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
}

export class FilmsSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/films/?page=1';
  private readonly relationsURLs: FilmsRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async filmRelations => {
      const filmsRepository = await this.dataSource.getRepository(Films);
      const film: Films = await filmsRepository.findOneBy({ name: filmRelations.name });
      await this.queryRelatedEntities(film, filmRelations);
      await filmsRepository.save(film);
    });
  }


  
  private async queryRelatedEntities(film: Films, filmRelations: FilmsRelations) {
    const relationFieldName = ["characters", "planets", "starships", "vehicles", "species"];
    const entityType = [People, Planets, Starships, Vehicles, Species];
    for (let i = 0; i < relationFieldName.length; i++) {
      filmRelations[relationFieldName[i]].forEach(async (url: string) => {
        film[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
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
      .into(Films)
      .values({
        name: data.name,
        url: data.url,
        episode_id: +data.episode_id,
        opening_crawl: data.opening_crawl,
        director: data.director,
        producer: data.producer,
        release_date: data.release_date,
      })
      .execute();
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      characters: data.characters,
      planets: data.planets,
      starships: data.starhips,
      vehicles: data.vehicles,
      species: data.species,
    });
  }
}