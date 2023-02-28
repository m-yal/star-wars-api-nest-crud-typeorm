import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";
import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { RandomMockFilmsGenerator } from "../films/mock.random.film.generator";
import { RandomMockPeopleGenerator } from "../people/mock.random.people.generator";
import { RandomMockPlanetGenerator } from "../planets/mock.random.planet.generator";
import { CreateSpeciesDto } from "./create.dto";
import { Species } from "./species.entity";

export class RandomMockSpeciesGenerator extends RandomMockUnitsGenerator<Species, CreateSpeciesDto> {

    generateOneWithRelatedUnits(): Species {
        const unit: Species = this.generateOneWithoutRelatedUnits();
        unit.homeworld = new RandomMockPlanetGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1))[0];
        unit.people = new RandomMockPeopleGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.films = new RandomMockFilmsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(specie: Species): CreateSpeciesDto {
        const dto = JSON.parse(JSON.stringify(specie));
        dto.homeworld = dto.homeworld.name;
        dto.people = dto.people.map(person => person.name);
        dto.films = dto.films.map(film => film.name);
        dto.images = dto.images.map(image => image.name);
        return dto;
    }

    generateOneWithoutRelatedUnits(): Species {
        return plainToInstance(Species, {
            name: faker.random.word(),
            classification: faker.random.word(),
            designation: faker.random.word(),
            average_height: faker.random.numeric(3),
            skin_colors: faker.random.word(),
            hair_colors: faker.random.word(),
            eye_colors: faker.random.word(),
            average_lifespan: faker.random.numeric(3),
            language: faker.random.word(),
            homeworld: "",
            people: [],
            films: [],
            images: [],
        });
    }
}