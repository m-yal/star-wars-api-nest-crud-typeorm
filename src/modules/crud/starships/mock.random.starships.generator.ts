import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { CreateStarshipDto } from "./create.dto";
import { Starships } from "./starships.entity";
import { RandomMockFilmsGenerator } from "../films/mock.random.film.generator";
import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockPeopleGenerator } from "../people/mock.random.people.generator";

export class RandomMockStrashipsGenerator extends RandomMockUnitsGenerator<Starships, CreateStarshipDto> {

    generateOneWithRelatedUnits(): Starships {
        const unit: Starships = this.generateOneWithoutRelatedUnits();
        unit.pilots = new RandomMockPeopleGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.films = new RandomMockFilmsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(starship: Starships): CreateStarshipDto {
        const dto = JSON.parse(JSON.stringify(starship));
        dto.pilots = dto.pilots.map(pilot => pilot.name);
        dto.films = dto.films.map(film => film.name);
        dto.images = dto.images.map(image => image.name);
        return dto;
    }

    generateOneWithoutRelatedUnits(): Starships {
        return plainToInstance(Starships, {
            name: faker.random.word(),
            model: faker.random.word(),
            manufacturer: faker.random.word(),
            cost_in_credits: faker.random.numeric(),
            length: faker.random.numeric(),
            max_atmosphering_speed: faker.random.numeric(),
            crew: faker.random.numeric(),
            passengers: faker.random.numeric(),
            cargo_capacity: faker.random.numeric(),
            consumables: faker.random.word(),
            hyperdrive_rating: faker.random.numeric(),
            MGLT: faker.random.numeric(),
            starship_class: faker.random.word(),
            pilots: [],
            films: [],
            images: [],
        });
    }
}