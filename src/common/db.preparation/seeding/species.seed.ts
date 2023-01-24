import axios from 'axios';
import { Films } from 'src/modules/crud/films/films.entity';
import { People } from 'src/modules/crud/people/people.entity';
import { Planets } from 'src/modules/crud/planets/planets.entity';
import { DataSource, Repository } from 'typeorm';
import { Species } from "../../../../src/modules/crud/species/species.entity";

type SpeciesRelations = {
  name: string,
  homeworld: string,
  people: string[],
  films: string[],
}

export class SpeciesSeeder {
  
  private readonly FIRST_PAGE_URL = 'https://swapi.dev/api/species/?page=1';
  private readonly relationsURLs: SpeciesRelations[] = [];

  constructor(private readonly dataSource: DataSource) { }

  public async baseDataSeed(): Promise<void> {
    await this.seedBaseDateRecursively(this.FIRST_PAGE_URL);
  }

  public async setRelations(): Promise<void> {
    this.relationsURLs.forEach(async speciesRelations => {
      const speciesRepository: Repository<Species> = await this.dataSource.getRepository(Species);
      const specie: Species = await speciesRepository.findOneBy({ name: speciesRelations.name });
      await this.queryRelatedEntities(specie, speciesRelations);
      await speciesRepository.save(specie);
    });
  }



  private async queryRelatedEntities(specie: Species, speciesRelations: SpeciesRelations) {
    const relationFieldName = ["people", "films"];
    const entityType = [People, Films];
    specie.homeworld = await this.dataSource.manager.findOneBy(Planets, { url: speciesRelations.homeworld });
    for (let i = 0; i < relationFieldName.length; i++) {
      speciesRelations[relationFieldName[i]].forEach(async (url: string) => {
        specie[relationFieldName[i]].push(await this.dataSource.manager.findOneBy(entityType[i], { url }));
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
      .into(Species)
      .values({
        name: data.name,
        url: data.url,
        classification: data.classification,
        designation: data.designation,
        average_height: !Number.isNaN(+data.average_height)
          ? +data.average_height
          : null,
        skin_colors: data.skin_colors,
        hair_colors: data.hair_colors,
        eye_colors: data.eye_colors,
        average_lifespan: !Number.isNaN(+data.average_lifespan)
          ? +data.average_lifespan
          : null,
        language: data.language,
      })
      .execute();
  }

  private collectRelationsURLs(data: any) {
    this.relationsURLs.push({
      name: data.name,
      homeworld: data.homeworld,
      people: data.people,
      films: data.films,
    });
  }
}