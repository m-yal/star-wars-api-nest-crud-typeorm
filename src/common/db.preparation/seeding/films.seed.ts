import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner } from 'typeorm';

// Relations urls
type FilmsRelations = {
  name: string,
  characters: string[],
  // planets: string[],
  // starships: string[],
  // vehicles: string[],
  // species: string[],
}

export class FilmsSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/films/?page=1';
  private readonly relationsURLs: FilmsRelations[] = [];
  private readonly httpService = new HttpService();
  private queryRunner: QueryRunner;
  private readonly RELATION_FIELD_ENTITY_MAP = {
    "characters": People,
    // "planets": Planets,
    // "starships": Starships,
    // "vehicles": Vehicles,
    // "species": Species,
  }

  public async baseDataSeed(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    const filmsRepository = await this.queryRunner.manager.getRepository(Films);
    const promises = this.relationsURLs.map(async filmRelations => {
      let film: Films = await filmsRepository.findOneBy({ name: filmRelations.name });
      const characters = await this.queryRelatedEntities(film, filmRelations);
      const updatedFilm = await filmsRepository.merge(film, {characters: characters});
      await filmsRepository.save(updatedFilm);
    });
    await Promise.all(promises);
  }


  
  private async queryRelatedEntities(film: Films, filmRelations: FilmsRelations) {
    let character: string | People = filmRelations.characters[0];
    character = await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP.characters, {url: character});
    console.log("character for relations setting: " + JSON.stringify(character));
    return [character];

    //---------------------------------------------------------------------------------------------

    // const charactersUrls = filmRelations.characters;
    // const characters = [];
    // const charactersInPromises = charactersUrls.map(async url => {
    //   const character = await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP.characters, { url });
    //   characters.push(character);
    // })
    // await Promise.all(charactersInPromises);
    // return characters;


    //----------------------------------------------------------------------------------------------

    // const relationFeildsNames: string[] = Object.keys(this.RELATION_FIELD_ENTITY_MAP);
    // const promises = relationFeildsNames.map(async (relationFieldName: string) => {
    //   film[relationFieldName] = [];
    //   const relatedUnitURLs: string[] = filmRelations[relationFieldName] || [];
    //   const promises = relatedUnitURLs.map(async (url: string): Promise<void> => {
    //     return await film[relationFieldName].push(await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP[relationFieldName], { url }));
    //   })
    //   await Promise.all(promises);
    // })
    // await Promise.all(promises);
  }

  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.get<any>(pageURL));
    const promises = data.results.map(async unit => {
      await this.insertBaseData(unit);
      this.collectRelationsURLs(unit);
    })
    await Promise.all(promises);
    if (data.next) {
      return await this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    await this.queryRunner.manager.save(Films, {
        name: String(data.title),
        url: String(data.url),
        episode_id: String(data.episode_id),
        opening_crawl: String(data.opening_crawl),
        director: String(data.director),
        producer: String(data.producer),
        release_date: Number.isNaN(Date.parse(data.release_date)) ? new Date(Date.now()) : new Date(data.release_date),
      });
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      characters: data.characters,
      // planets: data.planets,
      // starships: data.starhips,
      // vehicles: data.vehicles,
      // species: data.species,
    });
  }
}