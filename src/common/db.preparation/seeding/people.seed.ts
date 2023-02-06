import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { People } from 'src/modules/crud/people/people.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner, Repository } from 'typeorm';

type PeopleRelations = {
  name: string,
  species: string[],
  vehicles: string[],
  starships: string[],
}

export default class PeopleSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/people/?page=1';
  private readonly relationsURLs: PeopleRelations[] = [];
  private readonly httpService = new HttpService();

  private queryRunner: QueryRunner;
  private peopleRepository: Repository<People>;

  private RELATIONS_MAP = {
    species: Species,
    vehicles: Vehicles,
    starships: Starships,
  }

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
    this.peopleRepository = this.queryRunner.manager.getRepository(People);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    const relationsFieldsNames = Object.keys(this.RELATIONS_MAP);
    for await (const peopleRelationsUrls of this.relationsURLs) {
      const person = await this.peopleRepository.findOne({
        where: { name: peopleRelationsUrls.name },
        relations: relationsFieldsNames,
      })
      for await (const relationFieldName of relationsFieldsNames) {
        const relatedUnits = await this.getRelatedUnit(peopleRelationsUrls[relationFieldName], relationFieldName);
        person[relationFieldName] = relatedUnits;
      }
      await this.peopleRepository.save(person);
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
    const person = await this.peopleRepository.create({
      name: String(data.name),
      url: String(data.url),
      height: String(data.height),
      mass: String(data.mass),
      hair_color: String(data.hair_color),
      skin_color: String(data.skin_color),
      eye_color: String(data.eye_color),
      birth_year: String(data.birth_year),
      gender: String(data.gender),
    });
    await this.peopleRepository.save(person);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      species: data.species || [],
      vehicles: data.vehicles || [],
      starships: data.starships || [],
    });
  }
}