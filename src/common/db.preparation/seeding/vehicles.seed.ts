import axios from 'axios';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { DataSource } from 'typeorm';

type VehiclesRelations = {
  name: string,
  pilots: string[],
  films: string[],
}

export default class VehiclesSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/vehicles/?page=1';
  private readonly relationsURLs: VehiclesRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async vehicleRelations => {
      const vehiclesRepository = await this.dataSource.getRepository(Vehicles);
      const vehicle: Vehicles = await vehiclesRepository.findOneBy({ name: vehicleRelations.name });
      await this.queryRelatedEntities(vehicle, vehicleRelations);
      await vehiclesRepository.save(vehicle);
    });
  }



  private async queryRelatedEntities(vehicle: Vehicles, vehicleRelations: VehiclesRelations) {
    const relationFieldName = ["pilots", "films"];
    const entityType = [People, Films];
    for (let i = 0; i < relationFieldName.length; i++) {
      vehicleRelations[relationFieldName[i]].forEach(async (url: string) => {
        vehicle[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
      });
    }
  }

  private async seedBaseDateRecursively(pageURL: string): Promise<void> {
    const { data } = await axios.get(pageURL);
    await this.insertBaseData(data);
    this.collectRelationsURLs(data);
    if (data.next) {
      return this.seedBaseDateRecursively(data.next);
    }
  }

  private async insertBaseData(data: any) {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Vehicles)
      .values({
        name: data.name,
        url: data.url,
        model: data.model,
        manufacturer: data.manufacturer,
        cost_in_credits: !Number.isNaN(+data.cost_in_credits)
          ? +data.cost_in_credits
          : null,
        length: !Number.isNaN(+data.length) ? +data.length : null,
        max_atmosphering_speed: !Number.isNaN(+data.max_atmosphering_speed)
          ? +data.max_atmosphering_speed
          : null,
        crew: !Number.isNaN(+data.crew) ? +data.crew : null,
        passengers: !Number.isNaN(+data.passengers)
          ? +data.passengers
          : null,
        cargo_capacity: !Number.isNaN(+data.cargo_capacity)
          ? +data.cargo_capacity
          : null,
        consumables: data.consumables,
        vehicle_class: data.vehicle_class,
      })
      .execute();
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      pilots: data.pilots,
      films: data.films,
    });
  }
}