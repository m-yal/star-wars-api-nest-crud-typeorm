import { Films } from "src/modules/crud/entities/films.entity";
import { People } from "src/modules/crud/entities/people.entity";
import { Planets } from "src/modules/crud/entities/planets.entity";
import { Species } from "src/modules/crud/entities/species.entity";
import { Starships } from "src/modules/crud/entities/starships.entity";
import { Vehicles } from "src/modules/crud/entities/vehicles.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
abstract class BaseImage {
    @PrimaryColumn("varchar")
    filename: string;
}

@Entity()
export class FilmsImage extends BaseImage {
    @ManyToOne(() => Films, (films) => films.images, {onDelete: "CASCADE"})
    unit: Films;
}

@Entity()
export class PeopleImage extends BaseImage {
    @ManyToOne(() => People, (people) => people.images, {onDelete: "CASCADE"})
    unit: People;
}

@Entity()
export class PlanetsImage extends BaseImage {
    @ManyToOne(() => Planets, (planets) => planets.images, {onDelete: "CASCADE"})
    unit: Planets;
}

@Entity()
export class SpeciesImage extends BaseImage {
    @ManyToOne(() => Species, (species) => species.images, {onDelete: "CASCADE"})
    unit: Species;
}

@Entity()
export class StarshipsImage extends BaseImage {
    @ManyToOne(() => Starships, (starhips) => starhips.images, {onDelete: "CASCADE"})
    unit: Starships;
}

@Entity()
export class VehiclesImage extends BaseImage {
    @ManyToOne(() => Vehicles, (vehicles) => vehicles.images, {onDelete: "CASCADE"})
    unit: Vehicles;
}