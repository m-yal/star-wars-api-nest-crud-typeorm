import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { People } from "src/crud/entities/people.entity";
import { Films } from "src/crud/entities/films.entity";
import { Planets } from "src/crud/entities/planets.entity";
import { Species } from "src/crud/entities/species.entity";
import { Starships } from "src/crud/entities/starships.entity";
import { Vehicles } from "src/crud/entities/vehicles.entity";
import { Unit, UnitRecordValue, UnitTypeEnum } from "src/types/types";
import { MigrationInterface, QueryRunner, Repository } from "typeorm";
import * as fs from "fs";
import * as path from "path";

export class Seeder implements MigrationInterface {
    name = 'Seeder1669806219723';

    private readonly httpService: HttpService = new HttpService();
    private queryRunner: QueryRunner;
    private readonly SWAPI_URL: string = "https://swapi.dev/api/";
    private readonly entityTableNames:UnitTypeEnum[] = [
       UnitTypeEnum.People, UnitTypeEnum.Films,
       UnitTypeEnum.Planets, UnitTypeEnum.Species,
       UnitTypeEnum.Starships, UnitTypeEnum.Vehicles
    ];
    private readonly entiitesForRelationBinding:UnitTypeEnum[] = [
       UnitTypeEnum.People,UnitTypeEnum.Planets,UnitTypeEnum.Films
    ]
    private readonly URL_SPLITTERATOR = ",";


    public async up(queryRunner: QueryRunner): Promise<void> {
        this.queryRunner = queryRunner;
        await this.downloadRawDataFromApi();
        await this.setupRelationsInDB();
    }

    private async downloadRawDataFromApi(): Promise<void> {
        for await (const name of this.entityTableNames) {
            const data: Unit[] = await this.fetchEntity(name);
            await this.insertIntoDB(data, name);
        }
    }

    private async fetchEntity(name:UnitTypeEnum): Promise<Unit[]> {
        let link: string = this.SWAPI_URL + name;
        let results: Unit[] = []; 
        do {
            const {data} = await firstValueFrom(this.httpService.get(link));
            link = await data.next;
            console.log("Next page for upload: " + link);
            results = results.concat(this.convertArraysToString(await data.results));
        } while (link);
        return results;
    }

    private convertArraysToString(objects: Unit[]): Unit[] {
        for (const obj of objects) {
            for (let field in obj) {
                if (Array.isArray(obj[field])) obj[field] = obj[field].toString();
            }
        }
        return objects;
    }

    private async insertIntoDB(results: Unit[], entityName:UnitTypeEnum): Promise<void> {
        const objKeys: string = Object.keys(results[0]).toString(); //[0] because one instance is enough for defining input data schema
        const objKeysAmount: number = Object.keys(results[0]).length;
        const quesionMarks: string = "?, ".repeat(objKeysAmount).replace(/, $/, "");
        console.log(`obj keys ${objKeys} \n obj keys amount ${objKeysAmount} \n questions marks ${quesionMarks}`);
        for await (const obj of results) {
            await this.queryRunner.query(`INSERT INTO ${entityName}(${objKeys}) VALUES (${quesionMarks})`, Object.values(obj));
        }
    }

    private async setupRelationsInDB(): Promise<void> {
        for await (const entityName of this.entiitesForRelationBinding) {
            await this.setupRelationsFor(entityName);
        }
    }

    private async setupRelationsFor(entityName: UnitTypeEnum): Promise<void> {
        if (entityName === UnitTypeEnum.People) {
            await this.setRelationsForPeople();
        } else if (entityName === UnitTypeEnum.Films) {
            await this.setRelationsForFilms();
        } else if (entityName === UnitTypeEnum.Planets) {
            await this.setRelationsForPlanets();
        } else if (entityName === UnitTypeEnum.Species) {
            await this.setRealtionsForSpecies();
        } else {
            throw new Error("No such entity for setting relations");
        }
    }

    private async setRealtionsForSpecies(): Promise<void> {
        const speciesRepo: Repository<Species> = await this.getRepoBy(UnitTypeEnum.Species);
        const homeworldRepo: Repository<Planets> = await this.getRepoBy(UnitTypeEnum.Planets);

        const allSpecies: Species[] = await speciesRepo.find();
        for await (const species of allSpecies) {
            const homeworldUrl: string = species.homeworld;
            species.homeworldRel = await homeworldRepo.findOneBy({url: homeworldUrl});
        }
        await speciesRepo.save(allSpecies);
    }

    private async getRepoBy(entityName:UnitTypeEnum): Promise<Repository<Unit>> {
        switch (entityName) {
            case UnitTypeEnum.People: return this.queryRunner.manager.getRepository(People);
            case UnitTypeEnum.Films: return this.queryRunner.manager.getRepository(Films);
            case UnitTypeEnum.Planets: return this.queryRunner.manager.getRepository(Planets);
            case UnitTypeEnum.Species: return this.queryRunner.manager.getRepository(Species);
            case UnitTypeEnum.Starships: return this.queryRunner.manager.getRepository(Starships);
            case UnitTypeEnum.Vehicles: return this.queryRunner.manager.getRepository(Vehicles);
            default: throw new Error("No such repository found by input name: " + entityName)
        }
    }

    private async setRelationsForPlanets(): Promise<void> {
        const planetsRepo: Repository<Planets> = await this.getRepoBy(UnitTypeEnum.Planets);
        const peopleRepo: Repository<People> = await this.getRepoBy(UnitTypeEnum.People);
        const allPlanets: Planets[] = await planetsRepo.find();
        for await (const planet of allPlanets) {
            planet.residentsRel = [];
            const residentsUrls: string[] = planet.residents.split(this.URL_SPLITTERATOR);
            for await (const residentUrl of residentsUrls) {
                planet.residentsRel.push(await peopleRepo.findOneBy({url: residentUrl}));
            }
        }
        await planetsRepo.save(allPlanets);
    }

    private async setRelationsForFilms(): Promise<void> {
        const filmsRepo: Repository<Films> = await this.getRepoBy(UnitTypeEnum.Films);
        const allFilms: Films[] = await filmsRepo.find();
        const entityNameEntityMap: Record<string, UnitRecordValue> = {
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

    private async setRelationsForPeople(): Promise<void> {
        const peopleRepo: Repository<People> = await this.getRepoBy(UnitTypeEnum.People);
        const allPeople: People[] = await peopleRepo.find();
        const entityNameEntityMap: Record<string, UnitRecordValue> = {
            "species": Species,
            "vehicles": Vehicles,
            "starships": Starships
        }
        for await (const people of allPeople) {
            await this.bindSingleEntityRelations(people, entityNameEntityMap);
        }
        await peopleRepo.save(allPeople);
    }

    public async bindSingleEntityRelations(entity: Unit, entityNameEntityMap: Record<string, UnitRecordValue>): Promise<void> {
        const peopleRelUrlFields: string[] = Object.keys(entityNameEntityMap);
        for await (const fieldUrl of peopleRelUrlFields) {
            await this.setRelationsForField(fieldUrl, entity, entityNameEntityMap);
        }
    }

    private async setRelationsForField(field: string, entity: Unit, entityNameEntityMap: Record<string, UnitRecordValue>): Promise<void> {
        const allUrlsOfField: string[] = entity[field].split(this.URL_SPLITTERATOR);
        const otherSideRelationEntityRepo: Repository<Unit> = this.queryRunner.manager.getRepository(entityNameEntityMap[field]);
        const relFiledName: string = field + "Rel";
        entity[relFiledName] = [];
        for await (const url of allUrlsOfField) {
            await entity[relFiledName].push(await otherSideRelationEntityRepo.findOneBy({url: url}));
        }
    }



    public async down(queryRunner: QueryRunner): Promise<void> {
        const talbesNamesToEmpty: string[] = [
            "films_palnets_rel", "films_people_rel",     
            "films_species_rel", "films_starships_rel",  
            "films_vehicles_rel",  "people_species_rel",   
            "people_starships_rel",  "people_vehicles_rel",
            "people", "films", "planets", "species", "starships", "vehicles",
            "vehicles_image", "starships_image", "species_image",
            "planets_image", "people_image", "films_image"
        ];
        for await (const tableName of talbesNamesToEmpty) {
            await queryRunner.query(`DELETE FROM ${tableName};`);
        }
        this.deleteAllImageFiles();
    }

    private deleteAllImageFiles(): void {
        const directory: fs.PathLike = `${__dirname}/../../files`;
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), (err) => { if (err) throw err });
            }
        });
    }
}