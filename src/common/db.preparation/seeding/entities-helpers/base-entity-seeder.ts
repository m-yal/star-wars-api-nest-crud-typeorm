import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { QueryRunner, Repository } from "typeorm";

import { Units } from "../../../types/types";
import { UnitRelationsData } from "../types";

export abstract class BaseUnitsSeeder {
    
  abstract readonly FIRST_PAGE_URL: string;
  abstract readonly relationsURLs: UnitRelationsData[];
  abstract unitRepository: Repository<any>;
  abstract readonly RELATIONS_MAP: { };
  private readonly httpService: HttpService = new HttpService();
  readonly queryRunner: QueryRunner;

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    const relationsFieldsNames: string[] = Object.keys(this.RELATIONS_MAP);
    const unresolvedPromises: Promise<void>[] = this.relationsURLs.map(async (unitRelationsUrls: { name: string }) => {
      const unit: Units = await this.getUnit(unitRelationsUrls, relationsFieldsNames);
      await this.bindRelations(unit, relationsFieldsNames, unitRelationsUrls);
      await this.unitRepository.save(unit);
    })
    await Promise.all(unresolvedPromises);
  }



  private async getUnit(unitRelationsUrls: { name: string }, relationsFieldsNames: string[]): Promise<Units> {
    return await this.unitRepository.findOne({
      where: { name: unitRelationsUrls.name },
      relations: relationsFieldsNames,
    });
  }

  private async bindRelations(unit: Units, relationsFieldsNames: string[], unitRelationsUrls: { name: string }): Promise<void> {
    const unresolvedPromises: Promise<void>[] = relationsFieldsNames.map(async (relationFieldName: string) => {
      const relatedUnits: Units | Units[] = await this.getRelatedUnit(unitRelationsUrls[relationFieldName], relationFieldName);
      unit[relationFieldName] = relatedUnits;
    })
    await Promise.all(unresolvedPromises);
  }

  private async getRelatedUnit(unitUrls: string[] | string, relationFieldname: string): Promise<Units | Units[]>  {
    const relatedUnitRepository: Repository<Units> = this.queryRunner.manager.getRepository(this.RELATIONS_MAP[relationFieldname]);
    if (Array.isArray(unitUrls)) {
      return await this.getRelatedUnitsArray(unitUrls, relatedUnitRepository);
    } else {
      return await this.getSingleRelatedUnit(unitUrls, relatedUnitRepository);
    }
  }

  private async getSingleRelatedUnit(unitUrls: null | string, relatedUnitRepository: Repository<Units>): Promise<null | Units> {
    if (unitUrls === null) {
      return null;
    } else {
      return await relatedUnitRepository.findOneBy({ url: unitUrls });
    }
  }

  private async getRelatedUnitsArray(unitUrls: string[], relatedUnitRepository: Repository<Units>): Promise<Units[]> {
    const units: Units[] = [];
    const unresolvedPromises: Promise<void>[] = unitUrls.map(async unitUrl => {
      const unit: Units = await relatedUnitRepository.findOneBy({ url: unitUrl });
      units.push(unit);
    });
    await Promise.all(unresolvedPromises);
    return units;
  }

  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await firstValueFrom(this.httpService.get<any>(pageURL));
    await this.saveRawDataAndRelationsUrls(data);
    if (data.next) {
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async saveRawDataAndRelationsUrls(data: { results: any[] }) {
    const unresolvedPromises: Promise<void>[] = data.results.map(async (unit: any) => {
      this.insertBaseData(unit);
      this.collectRelationsURLs(unit);
    })
    await Promise.all(unresolvedPromises);
  }

  abstract insertBaseData(data: any): Promise<any>;

  abstract collectRelationsURLs(data: any): void;
}