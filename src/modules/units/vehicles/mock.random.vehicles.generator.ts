import { faker } from "@faker-js/faker";
import { plainToInstance } from "class-transformer";

import { RandomMockImagesGenerator } from "../../files/mocks/mock.random.images.generator";
import { RandomMockUnitsGenerator } from "../config/mocks/mock.random.unit.generator";
import { RandomMockFilmsGenerator } from "../films/mock.random.film.generator";
import { RandomMockPeopleGenerator } from "../people/mock.random.people.generator";
import { CreateVehicleDto } from "./create.dto";
import { Vehicle } from "./vehicles.entity";

export class RandomMockVehiclesGenerator extends RandomMockUnitsGenerator<Vehicle, CreateVehicleDto> {

    generateOneWithRelatedUnits(): Vehicle {
        const unit: Vehicle = this.generateOneWithoutRelatedUnits();
        unit.pilots = new RandomMockPeopleGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.films = new RandomMockFilmsGenerator().generateSeveralUnitsWithoutRelations(+faker.random.numeric(1));
        unit.images = new RandomMockImagesGenerator().generateSeveralRecords(+faker.random.numeric(1));
        return unit;
    }

    transformSingleUnitToCreateDto(vehicle: Vehicle): CreateVehicleDto {
        const dto = JSON.parse(JSON.stringify(vehicle));
        dto.pilots = dto.pilots.map(pilot => pilot.name);
        dto.films = dto.films.map(film => film.name);
        dto.images = dto.images.map(image => image.name);
        return dto;
    }

    generateOneWithoutRelatedUnits(): Vehicle {
        return plainToInstance(Vehicle, {
            name: faker.random.word(),
            model: faker.random.word(),
            manufacturer: faker.random.word(),
            cost_in_credits: faker.random.numeric(3),
            length: faker.random.numeric(3),
            max_atmosphering_speed: faker.random.numeric(3),
            crew: faker.random.numeric(3),
            passengers: faker.random.numeric(3),
            cargo_capacity: faker.random.numeric(3),
            consumables: faker.random.word(),
            vehicle_class: faker.random.word(),
            pilots: [],
            films: [],
            images: [],
        });
    }
}