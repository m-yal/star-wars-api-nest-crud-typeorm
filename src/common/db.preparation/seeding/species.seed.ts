import { firstValueFrom } from 'rxjs';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { QueryRunner, Repository } from 'typeorm';
import { Species } from "src/modules/crud/species/species.entity";
import { HttpService } from '@nestjs/axios';

type SpeciesRelations = {
  name: string,
  // homeworld: string,
  // specie: string[],
  // films: string[],
}

export class SpeciesSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/species/?page=1';
  private readonly relationsURLs: SpeciesRelations[] = [];
  private readonly httpService = new HttpService();
  
  private queryRunner: QueryRunner;
  private speciesRepository: Repository<Species>;

  private readonly RELATIONS_MAP = {
    // "films": Films,
  }

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
    this.speciesRepository = this.queryRunner.manager.getRepository(Species);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("relationsURLs of species " + JSON.stringify(this.relationsURLs));

  }

  public async setRelations(): Promise<void> {
    // const speciesRepository: Repository<Species> = await this.queryRunner.manager.getRepository(Species);
    // const promises = this.relationsURLs.map(async speciesRelations => {
    //   const specie: Species = await speciesRepository.findOneBy({ name: speciesRelations.name });
    //   // await this.queryRelatedEntities(specie, speciesRelations);
    //   await speciesRepository.save(specie);
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
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    const specie = this.speciesRepository.create({
      name: String(data.name),
      url: String(data.url),
      classification: String(data.classification),
      designation: String(data.designation),
      average_height: String(data.average_height),
      skin_colors: String(data.skin_colors),
      hair_colors: String(data.hair_colors),
      eye_colors: String(data.eye_colors),
      average_lifespan: String(data.average_lifespan),
      language: String(data.language),
    })
    await this.speciesRepository.save(specie);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      // homeworld: data.homeworld,
      // specie: data.specie || [],
      // films: data.films || [],
    });
  }
}