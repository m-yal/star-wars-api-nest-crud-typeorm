import { Files } from "../../files/entities/file.entity";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../config/base-entity";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";
import { IFilmsEntity } from "./films.entity.interfaces";

@Entity()
export class Films extends BaseEntity implements IFilmsEntity {

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





    @ManyToMany(() => People, (people) => people.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "films_people_relations" })
    characters: People[];

    @ManyToMany(() => Planets, (planets) => planets.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "films_planets_relations" })
    planets: Planets[];

    @ManyToMany(() => Starships, (starhips) => starhips.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "films_starships_relations" })
    starships: Starships[];

    @ManyToMany(() => Vehicles, (vehicles) => vehicles.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "films_vehicles_relations" })
    vehicles: Vehicles[];

    @ManyToMany(() => Species, (species) => species.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "films_species_relations" })
    species: Species[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "films_images_relations" })
    images: Files[];
}