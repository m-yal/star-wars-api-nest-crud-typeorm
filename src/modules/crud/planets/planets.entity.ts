import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { People } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { IPlanetsEntity } from "./planets.entity.interfaces";

@Entity()
export class Planets extends BaseEntity implements IPlanetsEntity {

    @Column("int", { nullable: true })
    rotation_period: number;

    @Column("int", { nullable: true })
    orbital_period: number;

    @Column("int", { nullable: true })
    diameter: number;

    @Column("varchar", { default: "unknown" })
    climate: string;

    @Column("varchar", { default: "unknown" })
    gravity: string;

    @Column("varchar", { default: "unknown" })
    terrain: string;

    @Column("int", { nullable: true })
    surface_water: number;

    @Column("int", { nullable: true })
    population: number;


    
    /* Relations */
    @OneToMany(() => People, (people) => people.homeworld, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    @JoinTable({ name: "planet_peoples_rel" })
    residents: People[];

    @ManyToMany(() => Films, (films) => films.planets, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    films: Films[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({ name: "planets_images_rel" })
    images: Files[];
}