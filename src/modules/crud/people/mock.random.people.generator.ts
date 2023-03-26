import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { RandomMockFilmsGenerator } from "../films/mock.random.film.generator";
import { RandomMockSpeciesGenerator } from "../species/mock.random.species.generator";
import { RandomMockStrashipsGenerator } from "../starships/mock.random.starships.generator";
import { RandomMockVehiclesGenerator } from "../vehicles/mock.random.vehicles.generator";
import { CreatePeopleDto } from "./create.dto";
import { People } from "./people.entity";

export class RandomMockPeopleGenerator extends RandomMockUnitsGenerator<People, CreatePeopleDto> {

    generateOneWithRelatedUnits(): People {
        const unit: People = this.generateOneWithoutRelatedUnits();
        unit.films = new RandomMockFilmsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.species = new RandomMockSpeciesGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.starships = new RandomMockStrashipsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1))
        unit.vehicles = new RandomMockVehiclesGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(people: People): CreatePeopleDto {
        const dto = JSON.parse(JSON.stringify(people));
        dto.films = dto.films.map(film => film.name);
        dto.species = dto.species.map(specie => specie.name);
        dto.starships = dto.starships.map(starships => starships.name);
        dto.vehicles = dto.vehicles.map(vehicle => vehicle.name);
        dto.images = dto.images.map(image => image.name);
        return dto;
    }

    generateOneWithoutRelatedUnits(): People {
        return plainToInstance(People, {
            name: faker.word.noun(),
            height: faker.random.numeric(3),
            mass: faker.random.numeric(3),
            hair_color: faker.random.word(),
            skin_color: faker.random.word(),
            eye_color: faker.random.word(),
            birth_year: faker.random.numeric(4),
            gender: faker.random.word(),
            films: [],
            species: [],
            starships: [],
            vehicles: [],
            images: [],
        });
    }
}