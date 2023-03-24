import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { People } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { Files } from "../../files/entities/file.entity";
import { Films } from "../films/films.entity";
import { IPlanetsEntity } from "./planets.entity.interfaces";

@Entity()
export class Planets extends BaseEntity implements IPlanetsEntity {

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
    @OneToMany(() => People, (people) => people.homeworld, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    residents: People[];

    @ManyToMany(() => Films, (films) => films.planets, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    films: Films[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "planets_images_relations" })
    images: Files[];
}