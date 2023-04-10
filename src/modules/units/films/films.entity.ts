import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { File } from "../../files/file.entity";
import { BaseEntity } from "../config/base-entity";
import { Person } from "../people/people.entity";
import { Planet } from "../planets/planets.entity";
import { Specie } from "../species/species.entity";
import { Starship } from "../starships/starships.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import { IFilmsEntity } from "./films.entity.interfaces";

@Entity({ name: "films" })
export class Film extends BaseEntity implements IFilmsEntity {

    @Column()
    episode_id: string;

    @Column("longtext")
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column({ type: 'date' })
    release_date: Date;





    @ManyToMany(() => Person, (people) => people.films)
    @JoinTable({ name: "films_people_relations" })
    characters: Person[];

    @ManyToMany(() => Planet, (planets) => planets.films)
    @JoinTable({ name: "films_planets_relations" })
    planets: Planet[];

    @ManyToMany(() => Starship, (starhips) => starhips.films)
    @JoinTable({ name: "films_starships_relations" })
    starships: Starship[];

    @ManyToMany(() => Vehicle, (vehicles) => vehicles.films)
    @JoinTable({ name: "films_vehicles_relations" })
    vehicles: Vehicle[];

    @ManyToMany(() => Specie, (species) => species.films)
    @JoinTable({ name: "films_species_relations" })
    species: Specie[];

    @ManyToMany(() => File)
    @JoinTable({ name: "films_images_relations" })
    images: File[];
}