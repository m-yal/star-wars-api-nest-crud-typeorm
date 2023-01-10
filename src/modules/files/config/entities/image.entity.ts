import { Films } from "src/modules/crud/config/entities/films.entity";
import { People } from "src/modules/crud/config/entities/people.entity";
import { Planets } from "src/modules/crud/config/entities/planets.entity";
import { Species } from "src/modules/crud/config/entities/species.entity";
import { Starships } from "src/modules/crud/config/entities/starships.entity";
import { Vehicles } from "src/modules/crud/config/entities/vehicles.entity";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { BaseImageData, ImageRelationsInterface } from "../interfaces/image.entity.interface";

@Entity()
abstract class BaseImage implements BaseImageData {
    @PrimaryColumn("varchar")
    filename: string;
}

@Entity()
export class FilmsImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => Films, (films) => films.images, {onDelete: "CASCADE"})
    unit: Films;
}

@Entity()
export class PeopleImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => People, (people) => people.images, {onDelete: "CASCADE"})
    unit: People;
}

@Entity()
export class PlanetsImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => Planets, (planets) => planets.images, {onDelete: "CASCADE"})
    unit: Planets;
}

@Entity()
export class SpeciesImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => Species, (species) => species.images, {onDelete: "CASCADE"})
    unit: Species;
}

@Entity()
export class StarshipsImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => Starships, (starhips) => starhips.images, {onDelete: "CASCADE"})
    unit: Starships;
}

@Entity()
export class VehiclesImage extends BaseImage implements ImageRelationsInterface {
    @ManyToOne(() => Vehicles, (vehicles) => vehicles.images, {onDelete: "CASCADE"})
    unit: Vehicles;
}