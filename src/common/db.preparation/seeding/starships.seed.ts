import axios from 'axios';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { DataSource } from 'typeorm';

type StarshipsRelations = {
  name: string,
  pilots: string[],
  films: string[],
}

export default class StarshipsSeeder {

  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/starships/?page=1';
  private readonly relationsURLs: StarshipsRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async starshipRelations => {
      const starshipsRepository = await this.dataSource.getRepository(Starships);
      const starhip: Starships = await starshipsRepository.findOneBy({ name: starshipRelations.name });
      await this.queryRelatedEntities(starhip, starshipRelations);
      await starshipsRepository.save(starhip);
    });
  }



  private async queryRelatedEntities(starhip: Starships, starshipRelations: StarshipsRelations) {
    const relationFieldName = ["pilots", "films"];
    const entityType = [People, Films];
    for (let i = 0; i < relationFieldName.length; i++) {
      starshipRelations[relationFieldName[i]].forEach(async (url: string) => {
        starhip[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
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
      .into(Starships)
      .values({
        name: data.name,
        url: data.url,
        model: data.model,
        manufacturer: data.manufacturer,
        cost_in_credits: !Number.isNaN(+data.cost_in_credits)
          ? +data.cost_in_credits
          : null,
        length: !Number.isNaN(+data.length) ? +data.length : null,
        max_atmosphering_speed: !Number.isNaN(
          +data.max_atmosphering_speed,
        )
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
        hyperdrive_rating: !Number.isNaN(+data.hyperdrive_rating)
          ? +data.hyperdrive_rating
          : null,
        MGLT: !Number.isNaN(+data.MGLT) ? +data.MGLT : null,
        starship_class: data.starship_class,
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