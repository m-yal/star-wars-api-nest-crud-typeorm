import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { QueryRunner, Repository } from 'typeorm';

type StarshipsRelations = {
  name: string,
  // pilots: string[],
  // films: string[],
}

export default class StarshipsSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/starships/?page=1';
  private readonly relationsURLs: StarshipsRelations[] = [];
  private readonly httpService = new HttpService();

  private queryRunner: QueryRunner;
  private starshipsRepository: Repository<Starships>;

  private readonly RELATIONS_MAP = {
    // "pilots": People,
    // "films": Films,
  }

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
    this.starshipsRepository = this.queryRunner.manager.getRepository(Starships);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("=== relationsURLs of starships: " + JSON.stringify(this.relationsURLs));

  }

  public async setRelations(): Promise<void> {
    // const starshipsRepository = await this.queryRunner.manager.getRepository(Starships);
    // const promises = this.relationsURLs.map(async starshipRelations => {
    //   const starhip: Starships = await starshipsRepository.findOneBy({ name: starshipRelations.name });
    //   await this.queryRelatedEntities(starhip, starshipRelations);
    //   await starshipsRepository.save(starhip);
    // })
    // await Promise.all(promises);
  }



  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.get<any>(pageURL));
    const promises = data.results.map(async unit => {
      await this.insertBaseData(unit);
      this.collectRelationsURLs(unit);
    });
    await Promise.all(promises);
    if (data.next) {
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    const starhip = this.starshipsRepository.create({
      name: String(data.name),
      url: String(data.url),
      model: String(data.model),
      manufacturer: String(data.manufacturer),
      cost_in_credits: String(data.cost_in_credits),
      length: String(data.length),
      max_atmosphering_speed: String(data.max_atmosphering_speed),
      crew: String(data.crew),
      passengers: String(data.passengers),
      cargo_capacity: String(data.cargo_capacity),
      consumables: String(data.consumables),
      hyperdrive_rating: String(data.hyperdrive_rating),
      MGLT: String(data.MGLT),
      starship_class: String(data.starship_class),
    })
    await this.starshipsRepository.save(starhip);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      // pilots: data.pilots || [],
      // films: data.films || [],
    });
  }
}