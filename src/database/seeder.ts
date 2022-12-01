import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { People } from "src/crud/entities/people.entity";
import { Films } from "src/crud/entities/films.entity";
import { Planets } from "src/crud/entities/planets.entity";
import { Species } from "src/crud/entities/species.entity";
import { Starships } from "src/crud/entities/starships.entity";
import { Vehicles } from "src/crud/entities/vehicles.entity";
import { Unit } from "src/crud/types/types";
import { In, MigrationInterface, QueryRunner } from "typeorm";

enum EntityNames {
    People = "people",
    Films = "films",
    Planets = "planets",
    Species = "species",
    Starships = "starships",
    Vehicles = "vehicles"       
}

/*
Execute only by command: npm run seed:run !
This caused by reverting migration (down method) after executing it up (up mehtod).
Deleting from data from db, for now is manual.
*/
export class Seeder implements MigrationInterface {
    name = 'Seeder1669806219723';

    private readonly httpService: HttpService = new HttpService();
    private queryRunner: QueryRunner;
    private readonly swapiURL: string = "https://swapi.dev/api/";

    private readonly entitiesNamesToSeed: EntityNames[] = [
        EntityNames.People, EntityNames.Films,
        EntityNames.Planets, EntityNames.Species,
        EntityNames.Starships, EntityNames.Vehicles
    ];
    private readonly URL_SPLITTERATOR = ",";

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.queryRunner = queryRunner;
        await this.downloadRawDataFromApi();
        await this.setupRelationsInDB();
    }

    private async downloadRawDataFromApi() {
        for await (const name of this.entitiesNamesToSeed) {
            const data = await this.fetchEntity(name);
            await this.insertIntoDB(data, name);
        }
    }

    private async fetchEntity(name: EntityNames): Promise<any> {
        let link: string = this.swapiURL + name;
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
        // for await (const entityName of this.entitiesNamesToSeed) {
        //     await this.setupRelationsFor(entityName);
        // }
        
        //training in relaitons creating and saving: trying to connect 1 spec with 1 person
        console.log("=== before getting repositories");
        const speciesRepo = this.queryRunner.manager.getRepository(Species);
        const planetsRepo = this.queryRunner.manager.getRepository(Planets);

        // const species: Species = await speciesRepo.findOneBy({url: "https://swapi.dev/api/species/3/"});
        // console.log("=== species " + JSON.stringify(species));
        // const homeworldUrl: string = species.homeworld;
        // console.log("=== homeworldUrl " + homeworldUrl);

        // const planet: Planets = await planetsRepo.findOneBy({url: homeworldUrl});
        // console.log("=== planet " + JSON.stringify(planet));
        
        // species.homeworld = planet;

        // console.log("=== before saving entities");
        // await this.queryRunner.manager.save<Species>(species);

        const result = await speciesRepo.find({where: {url: "https://swapi.dev/api/species/3/"}, relations: {homeworld: true}});
        console.log("=== result " + JSON.stringify(result));
        







    }

    // private async setupRelationsFor(entityName: EntityNames) {
    //     if (entityName === EntityNames.People) {
    //         await this.setRelationsForPeopleRecords();
    //     } else if (entityName === EntityNames.Films) {
    //         await this.setRelationsForFilmsRecords();
    //     } else if (entityName === EntityNames.Planets) {
    //         await this.setRelationsForPlanetsRecords();
    //     } else if (entityName === EntityNames.Species) {
    //         await this.setRelationsForSpeciesRecords();
    //     } else if (entityName === EntityNames.Starships) {
    //         await this.setRelationsForStarshipsRecords();
    //     } else if (entityName === EntityNames.Vehicles) {
    //         await this.setRelationsForVehiclesRecords();
    //     }
    // }

    // private async setRelationsForVehiclesRecords() {
    //     const allVehicles = await this.queryRunner.manager.find(Vehicles);
    //     for await (const vehicle of allVehicles) {
    //         const pilotsUrl = vehicle.pilots.split(this.URL_SPLITTERATOR);
    //         vehicle.pilotsRel = await this.queryRunner.manager.findBy(People, {url: In(pilotsUrl)})
    //         const filmsUrl = vehicle.films.split(this.URL_SPLITTERATOR);
    //         vehicle.filmsRel = await this.queryRunner.manager.findBy(Films, {url: In(filmsUrl)});
    //     }
    //     this.queryRunner.manager.save(allVehicles);
    // }

    // private async setRelationsForStarshipsRecords() {
    //     const allStarships = await this.queryRunner.manager.find(Starships);
    //     for await (const starship of allStarships) {
    //         const pilotsUrl = starship.pilots.split(this.URL_SPLITTERATOR);
    //         starship.pilotsRel = await this.queryRunner.manager.findBy(People, {url: In(pilotsUrl)});
    //         const filmsUrl = starship.films.split(this.URL_SPLITTERATOR);
    //         starship.filmsRel = await this.queryRunner.manager.findBy(Films, {url: In(filmsUrl)});
    //     }
    //     this.queryRunner.manager.save(allStarships);
    // }

    // private async setRelationsForSpeciesRecords() {
    //     const allSpecies = await this.queryRunner.manager.find(Species);
    //     for await (const species of allSpecies) {
    //         const homeworldUrl = species.homeworld;
    //         species.homeworldRel = await this.queryRunner.manager.findBy(Planets, {url: homeworldUrl});
    //         const peopleUrl = species.people.split(this.URL_SPLITTERATOR);
    //         species.peopleRel = await this.queryRunner.manager.findBy(People, {url: In(peopleUrl)});
    //         const filmsUrl = species.films.split(this.URL_SPLITTERATOR);
    //         species.filmsRel = await this.queryRunner.manager.findBy(Films, {url: In(filmsUrl)});
    //     }
    //     this.queryRunner.manager.save(allSpecies);
    // }

    // private async setRelationsForPlanetsRecords() {
    //     const allPlanets = await this.queryRunner.manager.find(Planets);
    //     for await (const planet of allPlanets) {
    //         const residentsUrl = planet.residents.split(this.URL_SPLITTERATOR);
    //         // planet.residentsRel = await this.queryRunner.manager.findBy(People, {url: In(residentsUrl)});
    //         const filmsUrl = planet.films.split(this.URL_SPLITTERATOR);
    //         planet.filmsRel = await this.queryRunner.manager.findBy(Films, {url: In(filmsUrl)});
    //     }
    //     this.queryRunner.manager.save(allPlanets);
    // }

    // private async setRelationsForFilmsRecords() {
    //     const allFilms = await this.queryRunner.manager.find(Films);
    //     for await (const film of allFilms) {
    //         const charactersUrl = film.characters.split(this.URL_SPLITTERATOR);
    //         film.charactersRel = await this.queryRunner.manager.findBy(People, {url: In(charactersUrl)});
    //         const planetsUrl = film.planets.split(this.URL_SPLITTERATOR);
    //         film.planetsRel = await this.queryRunner.manager.findBy(Planets, {url: In(planetsUrl)});
    //         const starshipsUrl = film.starships.split(this.URL_SPLITTERATOR);
    //         film.starshipsRel = await this.queryRunner.manager.findBy(Starships, {url: In(starshipsUrl)});
    //         const vehiclesUrl = film.vehicles.split(this.URL_SPLITTERATOR);
    //         film.vehiclesRel = await this.queryRunner.manager.findBy(Vehicles, {url: In(vehiclesUrl)});
    //         const speciesUrl = film.species.split(this.URL_SPLITTERATOR);
    //         film.speciesRel = await this.queryRunner.manager.findBy(Species, {url: In(speciesUrl)});
    //     }
    //     this.queryRunner.manager.save(allFilms);
    // }

    private async setRelationsForPeopleRecords() {
        const allPeopleRecords = await this.queryRunner.manager.find(People);
        for await (const person of allPeopleRecords) {
            // person.homeworldRel = await this.queryRunner.manager.findOneBy(Planets, {url: person.homeworld});
            // const filmsUrl = person.films.split(this.URL_SPLITTERATOR);
            // person.filmsRel = await this.queryRunner.manager.findBy(Films, {url: In(filmsUrl)});
            // const speciesUrl = person.species.split(this.URL_SPLITTERATOR);
            // person.speciesRel = await this.queryRunner.manager.findBy(Species, {url: In(speciesUrl)});
            // const vehiclesUrl = person.vehicles.split(this.URL_SPLITTERATOR);
            // person.vehiclesRel = await this.queryRunner.manager.findBy(Vehicles, {url: In(vehiclesUrl)});
            // const starshipsUrl = person.starships.split(this.URL_SPLITTERATOR);
            // person.starshipsRel = await this.queryRunner.manager.findBy(Starships, {url: In(starshipsUrl)});
        }
        this.queryRunner.manager.save(allPeopleRecords);
        await this.queryRunner.commitTransaction()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //temp solution
        // console.log("Ready for execution seeding one more time. For this, launch: npm run seed:run");
        const talbesNames = [
            "films_palnets_rel", "films_people_rel",     
            "films_species_rel", "films_starships_rel",  
            "films_vehicles_rel",  "people_species_rel",   
            "people_starships_rel",  "people_vehicles_rel", 
            "planets_people_rel" 
        ];
        for await (const tableName of talbesNames) {
            await queryRunner.query(`DELETE FROM ${tableName};`);
        }
    }
}