import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { People } from "src/crud/entities/people.entity";
import { Films } from "src/crud/entities/films.entity";
import { Planets } from "src/crud/entities/planets.entity";
import { Species } from "src/crud/entities/species.entity";
import { Starships } from "src/crud/entities/starships.entity";
import { Vehicles } from "src/crud/entities/vehicles.entity";
import { Unit } from "src/crud/types/types";
import { MigrationInterface, QueryRunner, Repository } from "typeorm";


enum EntityNames {
    People = "people",
    Films = "films",
    Planets = "planets",
    Species = "species",
    Starships = "starships",
    Vehicles = "vehicles"       
}

export class Seeder implements MigrationInterface {
    name = 'Seeder1669806219723';

    private readonly httpService: HttpService = new HttpService();
    private queryRunner: QueryRunner;
    private readonly SWAPI_URL: string = "https://swapi.dev/api/";
    private readonly entitiesForRawDataDownloading: EntityNames[] = [
        EntityNames.People, EntityNames.Films,
        EntityNames.Planets, EntityNames.Species,
        EntityNames.Starships, EntityNames.Vehicles
    ];
    private readonly entiitesForRelationBinding: EntityNames[] = [
        EntityNames.People, EntityNames.Planets, EntityNames.Films
    ]
    private readonly URL_SPLITTERATOR = ",";


    public async up(queryRunner: QueryRunner): Promise<void> {
        this.queryRunner = queryRunner;
        await this.downloadRawDataFromApi();
        await this.setupRelationsInDB();
    }

    private async downloadRawDataFromApi() {
        for await (const name of this.entitiesForRawDataDownloading) {
            const data = await this.fetchEntity(name);
            await this.insertIntoDB(data, name);
        }
    }

    private async fetchEntity(name: EntityNames): Promise<any> {
        let link: string = this.SWAPI_URL + name;
        let results: Unit[] = []; 
        do {
            const {data} = await firstValueFrom(this.httpService.get(link));
            link = await data.next;
            console.log("next page link: " + link);
            results = results.concat(this.convertArraysToString(await data.results));
        } while (link);
        return results;
    }

    private convertArraysToString(objects: any[]): any[] {
        for (const obj of objects) {
            for (let field in obj) {
                if (Array.isArray(obj[field])) obj[field] = obj[field].toString();
            }
        }
        return objects;
    }

    private async insertIntoDB(results: any[], entityName: EntityNames): Promise<void> {
        const objKeys: string = Object.keys(results[0]).toString(); //[0] because one instance is enough for defining input data schema
        const objKeysAmount: number = Object.keys(results[0]).length;
        const quesionMarks: string = "?, ".repeat(objKeysAmount).replace(/, $/, "");
        console.log(`obj keys ${objKeys} \n obj keys amount ${objKeysAmount} \n questions marks ${quesionMarks}`);
        for await (const obj of results) {
            await this.queryRunner.query(`INSERT INTO ${entityName}(${objKeys}) VALUES (${quesionMarks})`, Object.values(obj));
        }
    }

    private async setupRelationsInDB() {
        for await (const entityName of this.entiitesForRelationBinding) {
            await this.setupRelationsFor(entityName);
        }
    }

    private async setupRelationsFor(entityName: EntityNames) {
        if (entityName === EntityNames.People) {
            await this.setRelationsForPeople();
        } else if (entityName === EntityNames.Films) {
            await this.setRelationsForFilms();
        } else if (entityName === EntityNames.Planets) {
            await this.setRelationsForPlanets();
        } else if (entityName === EntityNames.Species) {
            await this.setRealtionsForSpecies();
        } else {
            throw new Error("No such entity for setting relations");
        }
    }

    private async setRealtionsForSpecies() {
        const speciesRepo = await this.getRepoBy(EntityNames.Species);
        const homeworldRepo = await this.getRepoBy(EntityNames.Planets);

        const allSpecies = await speciesRepo.find();
        for await (const species of allSpecies) {
            const homeworldUrl = species.homeworld;
            species.homeworldRel = await homeworldRepo.findOneBy({url: homeworldUrl});
        }
        await speciesRepo.save(allSpecies);
    }

    private async getRepoBy(entityName: EntityNames): Promise<Repository<any>> {
        switch (entityName) {
            case EntityNames.People: return this.queryRunner.manager.getRepository(People);
            case EntityNames.Films: return this.queryRunner.manager.getRepository(Films);
            case EntityNames.Planets: return this.queryRunner.manager.getRepository(Planets);
            case EntityNames.Species: return this.queryRunner.manager.getRepository(Species);
            case EntityNames.Starships: return this.queryRunner.manager.getRepository(Starships);
            case EntityNames.Vehicles: return this.queryRunner.manager.getRepository(Vehicles);
            default: throw new Error("No such repository found by input name: " + entityName)
        }
    }

    private async setRelationsForPlanets() {
        const planetsRepo = await this.getRepoBy(EntityNames.Planets);
        const peopleRepo = await this.getRepoBy(EntityNames.People);
        const allPlanets = await planetsRepo.find();
        for await (const planet of allPlanets) {
            planet.residentsRel = [];
            const residentsUrls = planet.residents.split(this.URL_SPLITTERATOR);
            for await (const residentUrl of residentsUrls) {
                planet.residentsRel.push(await peopleRepo.findOneBy({url: residentUrl}));
            }
        }
        await planetsRepo.save(allPlanets);
    }

    private async setRelationsForFilms() {
        const filmsRepo = await this.getRepoBy(EntityNames.Films);
        const allFilms: Films[] = await filmsRepo.find();
        const entityNameEntityMap = {
            "characters": People,
            "planets": Planets,
            "starships": Starships,
            "vehicles": Vehicles,
            "species": Species
        }
        for await (const film of allFilms) {
            await this.bindSingleEntityRelations(film, entityNameEntityMap);
        }
        await filmsRepo.save(allFilms);
    }

    private async setRelationsForPeople() {
        const peopleRepo = await this.getRepoBy(EntityNames.People);
        const allPeople = await peopleRepo.find();
        const entityNameEntityMap = {
            "species": Species,
            "vehicles": Vehicles,
            "starships": Starships
        }
        for await (const people of allPeople) {
            await this.bindSingleEntityRelations(people, entityNameEntityMap);
        }
        await peopleRepo.save(allPeople);
    }

    public async bindSingleEntityRelations(entity: Unit, entityNameEntityMap: any) {
        const peopleRelUrlFields: string[] = Object.keys(entityNameEntityMap);
        for await (const fieldUrl of peopleRelUrlFields) {
            await this.setRelationsForField(fieldUrl, entity, entityNameEntityMap);
        }
    }

    private async setRelationsForField(field: string, entity: Unit, entityNameEntityMap: any) {
        const allUrlsOfField = entity[field].split(this.URL_SPLITTERATOR);
        console.log("=== entityNameEntityMap[field] " + entityNameEntityMap[field]);
        const otherSideRelationEntityRepo = this.queryRunner.manager.getRepository(entityNameEntityMap[field]);
        const relFiledName = field + "Rel";
        entity[relFiledName] = [];
        for await (const url of allUrlsOfField) {
            await entity[relFiledName].push(await otherSideRelationEntityRepo.findOneBy({url: url}));
        }
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const talbesNamesToEmpty = [
            "films_palnets_rel", "films_people_rel",     
            "films_species_rel", "films_starships_rel",  
            "films_vehicles_rel",  "people_species_rel",   
            "people_starships_rel",  "people_vehicles_rel",
            "people", "films", "planets", "species", "starships", "vehicles" 
        ];
        for await (const tableName of talbesNamesToEmpty) {
            await queryRunner.query(`DELETE FROM ${tableName};`);
        }
    }
}