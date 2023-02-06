import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { QueryRunner, Repository } from 'typeorm';

type VehiclesRelations = {
  name: string,
  // pilots: string[],
  // films: string[],
}

export default class VehiclesSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/vehicles/?page=1';
  private readonly relationsURLs: VehiclesRelations[] = [];
  private readonly httpService = new HttpService();

  private queryRunner: QueryRunner;
  private vehiclesRepository: Repository<Vehicles>;


  private readonly RELATIONS_MAP = {
    // "pilots": People,
    // "films": Films,
  }

  constructor(queryRunner: QueryRunner) {
    this.queryRunner = queryRunner;
    this.vehiclesRepository = this.queryRunner.manager.getRepository(Vehicles);
  }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
    console.log("=== relationsURLs of vehicles " + JSON.stringify(this.relationsURLs));

  }

  public async setRelations(): Promise<void> {
    // const vehiclesRepository = await this.queryRunner.manager.getRepository(Vehicles);
    // const promises = this.relationsURLs.map(async vehicleRelations => {
    //   const vehicle: Vehicles = await vehiclesRepository.findOneBy({ name: vehicleRelations.name });
    //   await this.queryRelatedEntities(vehicle, vehicleRelations);
    //   await vehiclesRepository.save(vehicle);
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
    const vehicle = this.vehiclesRepository.create({
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
    await this.vehiclesRepository.save(vehicle);
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      // pilots: data.pilots || [],
      // films: data.films || [],
    });
  }
}