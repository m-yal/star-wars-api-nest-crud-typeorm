import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { RandomMockPeopleGenerator } from "../people/mock.random.people.generator";
import { RandomMockPlanetGenerator } from "../planets/mock.random.planet.generator";
import { RandomMockSpeciesGenerator } from "../species/mock.random.species.generator";
import { RandomMockStrashipsGenerator } from "../starships/mock.random.starships.generator";
import { RandomMockVehiclesGenerator } from "../vehicles/mock.random.vehicles.generator";
import { CreateFilmDto } from "./create.dto";
import { Films } from "./films.entity";

export class RandomMockFilmsGenerator extends RandomMockUnitsGenerator<Films, CreateFilmDto> {

    generateOneWithRelatedUnits(): Films {
        const unit: Films = this.generateOneWithoutRelatedUnits();
        unit.characters = new RandomMockPeopleGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.planets = new RandomMockPlanetGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.species = new RandomMockSpeciesGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.starships = new RandomMockStrashipsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1))
        unit.vehicles = new RandomMockVehiclesGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(film: Films): CreateFilmDto {
        const dto = JSON.parse(JSON.stringify(film));
        dto.characters = dto.characters.map(character => character.name);
        dto.planets = dto.planets.map(planet => planet.name);
        dto.species = dto.species.map(specie => specie.name);
        dto.starships = dto.starships.map(starships => starships.name);
        dto.vehicles = dto.vehicles.map(vehicle => vehicle.name);
        dto.images = dto.images.map(image => image.name);
        dto.release_date = dto.release_date.toString();
        return dto;
    }

    generateOneWithoutRelatedUnits(): Films {
        const month = +faker.random.numeric(1);
        const releaseDate = `${faker.random.numeric(4)}-${month ? month : 1}-${faker.random.numeric(1)}`;
        return plainToInstance(Films, {
            name: faker.word.noun() + faker.random.word() + faker.random.word(),
            director: faker.name.fullName(),
            producer: faker.name.fullName(),
            episode_id: faker.random.numeric(),
            opening_crawl: faker.random.words(+faker.random.numeric(2)),
            release_date: `${releaseDate}`,
            characters: [],
            planets: [],
            species: [],
            starships: [],
            vehicles: [],
            images: [],
        });
    }

    generateOneDtoWithoutRelations(): CreateFilmDto {
        return this.transformSingleUnitToCreateDto(this.generateOneWithoutRelatedUnits());
    }
}