import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

import { Person } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { IPlanetsEntity } from "./planets.entity.interfaces";

@Entity({ name: "planets" })
export class Planet extends BaseEntity implements IPlanetsEntity {

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    diameter: string;

    @Column()
    climate: string;

    @Column()
    gravity: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column()
    population: string;



    /* Relations */
    @OneToMany(() => Person, (people) => people.homeworld)
    @JoinTable()
    residents: Person[];

    @ManyToMany(() => Film, (films) => films.planets)
    films: Film[];

    @ManyToMany(() => File)
    @JoinTable({ name: "planets_images_relations" })
    images: File[];
}