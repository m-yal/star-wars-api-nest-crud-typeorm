import { Films } from "src/crud/entities/films.entity";
import { People } from "src/crud/entities/people.entity";
import { Planets } from "src/crud/entities/planets.entity";
import { Species } from "src/crud/entities/species.entity";
import { Starships } from "src/crud/entities/starships.entity";
import { Vehicles } from "src/crud/entities/vehicles.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
abstract class BaseImage {
    @PrimaryColumn("varchar")
    filename: string;
}

@Entity()
export class FilmsImage extends BaseImage {
    @ManyToOne(() => Films, (films) => films.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: Films;
}

@Entity()
export class PeopleImage extends BaseImage {
    @ManyToOne(() => People, (people) => people.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: People;
}

@Entity()
export class PlanetsImage extends BaseImage {
    @ManyToOne(() => Planets, (planets) => planets.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: Planets;
}

@Entity()
export class SpeciesImage extends BaseImage {
    @ManyToOne(() => Species, (species) => species.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: Species;
}

@Entity()
export class StarshipsImage extends BaseImage {
    @ManyToOne(() => Starships, (starhips) => starhips.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: Starships;
}

@Entity()
export class VehiclesImage extends BaseImage {
    @ManyToOne(() => Vehicles, (vehicles) => vehicles.images, {onDelete: "CASCADE", cascade: ["insert"]})
    unit: Vehicles;
}