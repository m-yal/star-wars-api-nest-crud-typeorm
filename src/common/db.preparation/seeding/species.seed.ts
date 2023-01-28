import { firstValueFrom } from 'rxjs';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { QueryRunner, Repository } from 'typeorm';
import { Species } from "src/modules/crud/species/species.entity";
import { HttpService } from '@nestjs/axios';

type SpeciesRelations = {
  name: string,
  homeworld: string,
  // specie: string[],
  // films: string[],
}

export class SpeciesSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/species/?page=1';
  private readonly relationsURLs: SpeciesRelations[] = [];
  private readonly httpService = new HttpService();
  private queryRunner: QueryRunner;
  private readonly RELATION_FIELD_ENTITY_MAP = {
    // "films": Films,
  }

  public async baseDataSeed(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("relationsURLs " + JSON.stringify(this.relationsURLs));

  }

  public async setRelations(queryRunner: QueryRunner): Promise<void> {
    this.queryRunner = queryRunner;
    const speciesRepository: Repository<Species> = await this.queryRunner.manager.getRepository(Species);
    const promises = this.relationsURLs.map(async speciesRelations => {
      const specie: Species = await speciesRepository.findOneBy({ name: speciesRelations.name });
      await this.queryRelatedEntities(specie, speciesRelations);
      await speciesRepository.save(specie);
    })
    await Promise.all(promises);
  }



  private async queryRelatedEntities(specie: Species, speciesRelations: SpeciesRelations) {
    specie.homeworld = await this.queryRunner.manager.findOneBy(Planets, { url: speciesRelations.homeworld });
    const relationFeildsNames: string[] = Object.keys(this.RELATION_FIELD_ENTITY_MAP);
    const promises = relationFeildsNames.map(async (relationFieldName: string) => {
      specie[relationFieldName] = [];
      const relatedUnitURLs: string[] = specie[relationFieldName] || [];
      const promises = relatedUnitURLs.map(async (url: string): Promise<void> => {
        return await specie[relationFieldName].push(await this.queryRunner.manager.findOneBy(this.RELATION_FIELD_ENTITY_MAP[relationFieldName], { url }));
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
    await this.queryRunner.manager.save(Species, {
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
    });
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      homeworld: data.homeworld,
      // specie: data.specie,
      // films: data.films,
    });
  }
}