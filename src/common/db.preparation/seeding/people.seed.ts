import axios from 'axios';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { Species } from 'src/modules/crud/species/species.entity';
import { Starships } from 'src/modules/crud/starships/starships.entity';
import { Vehicles } from 'src/modules/crud/vehicles/vehicles.entity';
import { DataSource } from 'typeorm';

type PeopleRelations = {
  name: string,
  homeworld: string,
  films: string[],
  species: string[],
  vehicles: string[],
  starships: string[],
}

export default class PeopleSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/people/?page=1';
  private readonly relationsURLs: PeopleRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async peopleRelations => {
      const peopleRepository = await this.dataSource.getRepository(People);
      const people: People = await peopleRepository.findOneBy({ name: peopleRelations.name });
      people.homeworld = await this.dataSource.manager.findOneBy(Planets, { url: peopleRelations.homeworld });
      await this.queryRelatedEntities(people, peopleRelations);
      peopleRepository.save(people);
    });
  }
  



  private async queryRelatedEntities(people: People, peopleRelations: PeopleRelations) {
    const relationFieldName = ["films", "species", "vehicles", "starships"];
    const entityType = [Films, Species, Vehicles, Starships];
    for (let i = 0; i < relationFieldName.length; i++) {
      peopleRelations[relationFieldName[i]].forEach(async (url: string) => {
        people[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
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
      .into(People)
      .values({
        name: data.name,
        url: data.url,
        height: Boolean(+data.height) ? +data.height : null,
        mass: !!+data.mass ? data.mass : null,
        hair_color: data.hair_color,
        skin_color: data.skin_color,
        eye_color: data.eye_color,
        birth_year: data.birth_year,
        gender: data.gender,
      })
      .execute();
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      homeworld: data.homeworld,
      films: data.films,
      species: data.species,
      vehicles: data.vehicles,
      starships: data.starhips,
    });
  }
}
