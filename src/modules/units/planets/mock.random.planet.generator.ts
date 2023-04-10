import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { RandomMockFilmsGenerator } from "../films/mock.random.film.generator";
import { RandomMockPeopleGenerator } from "../people/mock.random.people.generator";
import { CreatePlanetDto } from "./create.dto";
import { Planet } from "./planets.entity";

export class RandomMockPlanetGenerator extends RandomMockUnitsGenerator<Planet, CreatePlanetDto> {

    generateOneWithRelatedUnits(): Planet {
        const unit: Planet = this.generateOneWithoutRelatedUnits();
        unit.residents = new RandomMockPeopleGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.films = new RandomMockFilmsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(planet: Planet): CreatePlanetDto {
        const dto = JSON.parse(JSON.stringify(planet));
        dto.residents = dto.residents.map(resident => resident.name);
        dto.films = dto.films.map(film => film.name);
        dto.images = dto.images.map(image => image.name);
        return dto;
    }

    generateOneWithoutRelatedUnits(): Planet {
        return plainToInstance(Planet, {
            name: faker.word.noun(),
            rotation_period: faker.random.numeric(3),
            orbital_period: faker.random.numeric(2),
            diameter: faker.random.numeric(3),
            climate: faker.random.word(),
            gravity: faker.random.word(),
            terrain: faker.random.word(),
            surface_water: faker.random.word(),
            population: faker.random.numeric(6),
            residents: [],
            films: [],
            images: [],
        })
    }
}