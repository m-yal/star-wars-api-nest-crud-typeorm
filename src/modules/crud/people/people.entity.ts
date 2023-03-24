import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";
import { BaseEntity } from "../config/base-entity";
import { Files } from "../../files/entities/file.entity";
import { Films } from "../films/films.entity";
import { IPeopleEntity } from "./people.entity.interfaces";
import { IsNumberString } from "class-validator";

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
    @JoinTable({ name: "people_species_relations" })
    species: Species[];

    @ManyToMany(() => Vehicles, vehicles => vehicles.pilots, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "people_vehicles_relations" })
    vehicles: Vehicles[];

    @ManyToMany(() => Starships, starships => starships.pilots, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    @JoinTable({ name: "people_starships_relations" })
    starships: Starships[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "people_images_relations" })
    images: Files[];
}