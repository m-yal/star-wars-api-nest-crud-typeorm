import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { QueryRunner, Repository } from "typeorm";

export abstract class BaseEntitySeeder {
    
  abstract readonly FIRST_PAGE_URL: string;
  abstract readonly relationsURLs;
  private readonly httpService = new HttpService();

  readonly queryRunner: QueryRunner;
  abstract unitRepository: Repository<any>;

  abstract readonly RELATIONS_MAP;

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    const relationsFieldsNames = Object.keys(this.RELATIONS_MAP);
    for await (const unitRelationsUrls of this.relationsURLs) {
      const unit = await this.unitRepository.findOne({
        where: { name: unitRelationsUrls.name },
        relations: relationsFieldsNames,
      });
      for await (const relationFieldName of relationsFieldsNames) {
        const relatedUnits = await this.getRelatedUnit(unitRelationsUrls[relationFieldName], relationFieldName);
        unit[relationFieldName] = relatedUnits;
      }
      await this.unitRepository.save(unit);
    }
  }



  private async getRelatedUnit(unitUrls: string[] | string, relationFieldname: string) {
    const relatedUnitRepository = this.queryRunner.manager.getRepository(this.RELATIONS_MAP[relationFieldname]);
    if (Array.isArray(unitUrls)) {
      const units = [];
      const unresolvedPromises = unitUrls.map(async unitUrl => {
        const unit = await relatedUnitRepository.findOneBy({ url: unitUrl });
        units.push(unit);
      });
      await Promise.all(unresolvedPromises);
      return units;
    } else {
      if (unitUrls === null) {
        return null;
      } else {
        return await relatedUnitRepository.findOneBy({ url: unitUrls });
      }
    }
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

  abstract insertBaseData(data: any): Promise<any>;

  abstract collectRelationsURLs(data: any);
}