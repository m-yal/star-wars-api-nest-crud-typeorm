import { Files } from "src/modules/files/file.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
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
    episode_id: string

    @Column("longtext")
    opening_crawl: string;

    @Column()
    director: string;

    @Column()
    producer: string;

    @Column({ type: 'date' })
    release_date: Date;





    @ManyToMany(() => People, (people) => people.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    characters: People[];

    @ManyToMany(() => Planets, (planets) => planets.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    planets: Planets[];

    @ManyToMany(() => Starships, (starhips) => starhips.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    starships: Starships[];

    @ManyToMany(() => Vehicles, (vehicles) => vehicles.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    vehicles: Vehicles[];

    @ManyToMany(() => Species, (species) => species.films, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    species: Species[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable()
    images: Files[];
}