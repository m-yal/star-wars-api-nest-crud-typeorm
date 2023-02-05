import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { EntityManager, QueryRunner, Repository } from 'typeorm';

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
  private filmsRepository: Repository<Films>;
  private peopleRepository: Repository<People>;

  constructor(queryRuner: QueryRunner) {
    this.queryRunner = queryRuner;
    this.filmsRepository = this.queryRunner.manager.getRepository(Films);
    this.peopleRepository = this.queryRunner.manager.getRepository(People);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("=== after base data seed of films: " + JSON.stringify(this.relationsURLs));
  }

  public async setRelations(): Promise<void> {
    for await (const filmRelationsUrls of this.relationsURLs) {
      const film = await this.filmsRepository.findOne({
        where: { name: filmRelationsUrls.name },
        relations: ['characters'],
      })
      console.log("=== film name: " + film.name);
      
      // film.characters = [];
      // await filmRepository.save(film);
      const characters: People[] = await this.getCharacters(filmRelationsUrls.characters, this.peopleRepository);
      // const updatedFilm = await filmRepository.merge(film, { characters });
      film.characters = characters;
      // await filmRepository.save(updatedFilm);
      await this.filmsRepository.save(film);
    }
  }




  private async getCharacters(charactersUrls: string[], peopleRepository: Repository<People>): Promise<People[]> {
    const characters: People[] = [];
    for await (const characterUrl of charactersUrls) {
      const character = await peopleRepository.findOneBy({ url: characterUrl });
      characters.push(character);      
    }
    return characters;
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
    const film = await this.filmsRepository.create({
      name: String(data.title),
      url: String(data.url),
      episode_id: String(data.episode_id),
      opening_crawl: String(data.opening_crawl),
      director: String(data.director),
      producer: String(data.producer),
      release_date: Number.isNaN(Date.parse(data.release_date)) ? new Date(Date.now()) : new Date(data.release_date),
    });
    await this.filmsRepository.save(film);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.title,
      characters: data.characters,
      // planets: data.planets,
      // starships: data.starhips,
      // vehicles: data.vehicles,
      // species: data.species,
    });
  }
}