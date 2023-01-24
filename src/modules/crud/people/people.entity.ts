import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";
import { BaseEntity } from "../config/base-entity";
import { Files } from "src/modules/files/file.entity";
import { Films } from "../films/films.entity";
import { IPeopleEntity } from "./people.entity.interfaces";

@Entity()
export class People extends BaseEntity implements IPeopleEntity {

    @Column("int", { nullable: true })
    height: number;

    @Column("int", { nullable: true })
    mass: number;

    @Column("varchar", { default: "unknown" })
    hair_color: string;

    @Column("varchar", { default: "unknown" })
    skin_color: string;

    @Column("varchar", { default: "unknown" })
    eye_color: string;

    @Column("int", { nullable: true })
    birth_year: number;

    @Column("varchar", { default: "unknown" })
    gender: string;


    
    @ManyToOne(() => Planets, (planets) => planets.residents, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    homeworld: Planets;

    @ManyToMany(() => Films, (films) => films.characters, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    films: Films[];

    @ManyToMany(() => Species, species => species.people, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    @JoinTable({ name: "people_species_rel" })
    species: Species[];

    @ManyToMany(() => Vehicles, vehicles => vehicles.pilots, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    @JoinTable({ name: "people_vehicles_rel" })
    vehicles: Vehicles[];

    @ManyToMany(() => Starships, starships => starships.pilots, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    @JoinTable({ name: "people_starships_rel" })
    starships: Starships[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({ name: "people_images_rel" })
    images: Files[];
}