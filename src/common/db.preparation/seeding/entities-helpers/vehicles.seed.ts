import { QueryRunner, Repository } from 'typeorm';

import { Vehicle } from '../../../../modules/units/vehicles/vehicles.entity';
import { VehiclesRelations } from '../types';
import { BaseUnitsSeeder } from './base-entity-seeder';

export default class VehiclesSeeder extends BaseUnitsSeeder {

  readonly FIRST_PAGE_URL: string = 'https://swapi.dev/api/vehicles/?page=1';
  readonly relationsURLs: VehiclesRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {

  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Vehicle);
  }

  async insertBaseData(data: any): Promise<void> {
    const vehicle: Vehicle = await this.unitRepository.create({
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
      vehicle_class: String(data.vehicle_class),
    });
    await this.unitRepository.save(vehicle);
  }

  collectRelationsURLs(data: any): void {
    this.relationsURLs.push({
      name: data.name,
    });
  }
}