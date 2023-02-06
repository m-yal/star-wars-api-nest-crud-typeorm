import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
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

    @Column()
    height: string;

    @Column()
    mass: string;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;


    
    
    @ManyToOne(() => Planets, (planets) => planets.residents, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    homeworld: Planets;

    @ManyToMany(() => Films, (films) => films.characters, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    films: Films[];

    @ManyToMany(() => Species, species => species.people, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    species: Species[];

    @ManyToMany(() => Vehicles, vehicles => vehicles.pilots, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    vehicles: Vehicles[];

    @ManyToMany(() => Starships, starships => starships.pilots, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable()
    starships: Starships[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable()
    images: Files[];
}