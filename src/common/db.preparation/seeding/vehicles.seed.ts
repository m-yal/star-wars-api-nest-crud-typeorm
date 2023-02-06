import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner, Repository } from 'typeorm';
import { BaseEntitySeeder } from './base-entity-seeder';

type VehiclesRelations = {
  name: string,
}

export default class VehiclesSeeder extends BaseEntitySeeder {

  readonly FIRST_PAGE_URL = 'https://swapi.dev/api/vehicles/?page=1';
  readonly relationsURLs: VehiclesRelations[] = [];
  readonly unitRepository: Repository<any>;
  readonly RELATIONS_MAP = {

  }

  constructor(queryRunner: QueryRunner) {
    super(queryRunner);
    this.unitRepository = this.queryRunner.manager.getRepository(Vehicles);
  }

  async insertBaseData(data: any) {
    const vehicle = this.unitRepository.create({
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

  collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
    });
  }
}