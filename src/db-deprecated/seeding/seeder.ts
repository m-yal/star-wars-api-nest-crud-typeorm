// import fetch from "node-fetch";
// import { Films } from "src/crud/entities/films.entity";
// import { People } from "src/crud/entities/people.entity";
// import { Planets } from "src/crud/entities/planets.entity";
// import { Species } from "src/crud/entities/species.entity";
// import { Starships } from "src/crud/entities/starships.entity";
// import { Vehicles } from "src/crud/entities/vehicles.entity";
// import { Unit } from "src/crud/types/types";
// import { In } from "typeorm";
// import dataSource from "../../database/data-sources/data-source-for-migrations";

// /* DEPRECATED */
// class SwapiSeeder {

//     private readonly swapiLink: RequestInfo = "https://swapi.dev/api/";
    
//     private readonly connection = dataSource;
//     private readonly dataSourceManager = this.connection.manager;
    
//     private readonly fetchInfo: any = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: null
//     }

//     private readonly EntityNames = {
//         People: "people",
//         Films: "films",
//         Planets: "planets",
//         Species: "species",
//         Starships: "starships",
//         Vehicles: "vehicles"       
//     }

//     private readonly entitiesNamesToSeed: any[] = [
//         this.EntityNames.People, this.EntityNames.Films,
//         this.EntityNames.Planets, this.EntityNames.Species,
//         this.EntityNames.Starships, this.EntityNames.Vehicles
//     ];
//     private readonly URL_SPLITTERATOR = ",";


//     public async run(): Promise<void> {
//         // await this.downloadRawDataFromApi();
//         await this.setupRelationsInDB();
//     }

//     private async downloadRawDataFromApi() {
//         for await (const entityName of this.entitiesNamesToSeed) {
//             let data = await this.fetch(entityName);
//             await this.insertIntoDB(data, entityName);
//         }
//     }

//     private async setupRelationsInDB() {
//         for await (const entityName of this.entitiesNamesToSeed) {
//             await this.setupRelationsFor(entityName);
//         }
//     }

//     private async setupRelationsFor(entityName: EntityNames) {
//         if (entityName === EntityNames.People) {
//             console.log("match for: " + entityName);
//             await this.setRelationsForPeopleRecords();
//         } else if (entityName === EntityNames.Films) {
//             await this.setRelationsForFilmsRecords();
//         } else if (entityName === EntityNames.Planets) {
//             await this.setRelationsForPlanetsRecords();
//         } else if (entityName === EntityNames.Species) {
//             await this.setRelationsForSpeciesRecords();
//         } else if (entityName === EntityNames.Starships) {
//             await this.setRelationsForStarshipsRecords();
//         } else if (entityName === EntityNames.Vehicles) {
//             await this.setRelationsForVehiclesRecords();
//         }
//         console.log("no matches");
//     }

//     private async setRelationsForVehiclesRecords() {
//         const allVehicles = await this.dataSourceManager.find(Vehicles);
//         for await (const vehicle of allVehicles) {
//             const pilotsUrl = vehicle.pilots.split(this.URL_SPLITTERATOR);
//             vehicle.pilotsRel = await this.dataSourceManager.findBy(People, {url: In(pilotsUrl)})
//             const filmsUrl = vehicle.films.split(this.URL_SPLITTERATOR);
//             vehicle.filmsRel = await this.dataSourceManager.findBy(Films, {url: In(filmsUrl)});
//         }
//         this.dataSourceManager.save(allVehicles);
//     }

//     private async setRelationsForStarshipsRecords() {
//         const allStarships = await this.dataSourceManager.find(Starships);
//         for await (const starship of allStarships) {
//             const pilotsUrl = starship.pilots.split(this.URL_SPLITTERATOR);
//             starship.pilotsRel = await this.dataSourceManager.findBy(People, {url: In(pilotsUrl)});
//             const filmsUrl = starship.films.split(this.URL_SPLITTERATOR);
//             starship.filmsRel = await this.dataSourceManager.findBy(Films, {url: In(filmsUrl)});
//         }
//         this.dataSourceManager.save(allStarships);
//     }

//     private async setRelationsForSpeciesRecords() {
//         const allSpecies = await this.dataSourceManager.find(Species);
//         for await (const species of allSpecies) {
//             const homeworldUrl = species.homeworld;
//             species.homeworldRel = await this.dataSourceManager.findBy(Planets, {url: homeworldUrl});
//             const peopleUrl = species.people.split(this.URL_SPLITTERATOR);
//             species.peopleRel = await this.dataSourceManager.findBy(People, {url: In(peopleUrl)});
//             const filmsUrl = species.films.split(this.URL_SPLITTERATOR);
//             species.filmsRel = await this.dataSourceManager.findBy(Films, {url: In(filmsUrl)});
//         }
//         this.dataSourceManager.save(allSpecies);
//     }

//     private async setRelationsForPlanetsRecords() {
//         const allPlanets = await this.dataSourceManager.find(Planets);
//         for await (const planet of allPlanets) {
//             const residentsUrl = planet.residents.split(this.URL_SPLITTERATOR);
//             planet.residentsRel = await this.dataSourceManager.findBy(People, {url: In(residentsUrl)});
//             const filmsUrl = planet.films.split(this.URL_SPLITTERATOR);
//             planet.filmsRel = await this.dataSourceManager.findBy(Films, {url: In(filmsUrl)});
//         }
//         this.dataSourceManager.save(allPlanets);
//     }

//     private async setRelationsForFilmsRecords() {
//         const allFilms = await this.dataSourceManager.find(Films);
//         for await (const film of allFilms) {
//             const charactersUrl = film.characters.split(this.URL_SPLITTERATOR);
//             film.charactersRel = await this.dataSourceManager.findBy(People, {url: In(charactersUrl)});
//             const planetsUrl = film.planets.split(this.URL_SPLITTERATOR);
//             film.planetsRel = await this.dataSourceManager.findBy(Planets, {url: In(planetsUrl)});
//             const starshipsUrl = film.starships.split(this.URL_SPLITTERATOR);
//             film.starshipsRel = await this.dataSourceManager.findBy(Starships, {url: In(starshipsUrl)});
//             const vehiclesUrl = film.vehicles.split(this.URL_SPLITTERATOR);
//             film.vehiclesRel = await this.dataSourceManager.findBy(Vehicles, {url: In(vehiclesUrl)});
//             const speciesUrl = film.species.split(this.URL_SPLITTERATOR);
//             film.speciesRel = await this.dataSourceManager.findBy(Species, {url: In(speciesUrl)});
//         }
//         this.dataSourceManager.save(allFilms);
//     }

//     private async setRelationsForPeopleRecords() {
//         const allPeopleRecords = await this.dataSourceManager.find(People);
//         console.log("Gathered all people records");
//         for await (const person of allPeopleRecords) {
//             person.homeworldRel = await this.dataSourceManager.findOneBy(Planets, {url: person.homeworld});
//             const filmsUrl = person.films.split(this.URL_SPLITTERATOR);
//             person.filmsRel = await this.dataSourceManager.findBy(Films, {url: In(filmsUrl)});
//             const speciesUrl = person.species.split(this.URL_SPLITTERATOR);
//             person.speciesRel = await this.dataSourceManager.findBy(Species, {url: In(speciesUrl)});
//             const vehiclesUrl = person.vehicles.split(this.URL_SPLITTERATOR);
//             person.vehiclesRel = await this.dataSourceManager.findBy(Vehicles, {url: In(vehiclesUrl)});
//             const starshipsUrl = person.starships.split(this.URL_SPLITTERATOR);
//             person.starshipsRel = await this.dataSourceManager.findBy(Starships, {url: In(starshipsUrl)});
//         }
//         this.dataSourceManager.save(allPeopleRecords);
//     }

//     private async fetch(entityName: EntityNames): Promise<any[]> {
//         let link: string = this.swapiLink + entityName;
//         let apiRes: {next: string, results: any[]};
//         let results: Unit[] = []; 
//         do {
//             apiRes = await (await fetch(link, this.fetchInfo)).json();
//             link = apiRes.next;
//             results = results.concat(this.convertArraysToString(apiRes.results));
//         } while (link);
//         return results;
//     }

//     private convertArraysToString(objects: any[]): any[] {
//         for (const obj of objects) {
//             for (let field in obj) {
//                 if (Array.isArray(obj[field])) obj[field] = obj[field].toString();
//             }
//         }
//         return objects;
//     }

//     private async insertIntoDB(results: any[], entityName: EntityNames): Promise<void> {
//         const objKeys: string = Object.keys(results[0]).toString(); //[0] because one instance is enough for defining schema
//         const objKeysAmount: number = Object.keys(results[0]).length;
//         const quesionMarks: string = "?, ".repeat(objKeysAmount).replace(/, $/, "");
//         console.log(`obj keys ${objKeys} \n obj keys amount ${objKeysAmount} \n questions marks ${quesionMarks}`);
//         for await (const obj of results) {
//             await this.connection.query(`INSERT INTO ${entityName}(${objKeys}) VALUES (${quesionMarks})`, Object.values(obj));
//         }
//     }
// }

// new SwapiSeeder().run();