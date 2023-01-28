import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner } from 'typeorm';

type PeopleRelations = {
  name: string,
  // homeworld: string,
  // species: string[],
  // vehicles: string[],
  // starships: string[],
}

export default class PeopleSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/people/?page=1';
  private readonly relationsURLs: PeopleRelations[] = [];
  private readonly httpService = new HttpService();
  private queryRunner: QueryRunner;
  private readonly RELATION_FIELD_ENTITY_MAP = {
    // "species": Species,
    // "vehicles": Vehicles,
    // "starships": Starships,
  }

  public async baseDataSeed(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);

  }

  public async setRelations(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    // const peopleRepository = await this.queryRunner.manager.getRepository(People);
    // const promises = this.relationsURLs.map(async peopleRelations => {
    //   const people: People = await peopleRepository.findOneBy({ name: peopleRelations.name });
    //   await this.queryRelatedEntities(people, peopleRelations);
    //   await peopleRepository.save(people);
    // });
    // await Promise.all(promises);
  }
  



  private async queryRelatedEntities(people: People, peopleRelations: PeopleRelations) {
    // people.homeworld = await this.queryRunner.manager.findOneBy(Planets, { url: peopleRelations.homeworld });
    const relationFeildsNames: string[] = Object.keys(this.RELATION_FIELD_ENTITY_MAP);
    const promises = relationFeildsNames.map(async (relationFieldName: string) => {
      people[relationFieldName] = [];
      const relatedUnitURLs: string[] = peopleRelations[relationFieldName] || [];
      const promises = relatedUnitURLs.map(async (url: string): Promise<void> => {
        return await people[relationFieldName].push(await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP[relationFieldName], { url }));
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
    await this.queryRunner.manager.save(People, {
      name: String(data.name),
      url: String(data.url),
      height: String(data.height),
      mass: String(data.mass),
      hair_color: String(data.hair_color),
      skin_color: String(data.skin_color),
      eye_color: String(data.eye_color),
      birth_year: String(data.birth_year),
      gender: String(data.gender),
    })
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      // homeworld: data.homeworld,
      // species: data.species,
      // vehicles: data.vehicles,
      // starships: data.starhips,
    });
  }
}
