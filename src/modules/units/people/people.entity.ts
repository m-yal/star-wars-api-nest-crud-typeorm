import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

import { Planet } from "../planets/planets.entity";
import { Specie } from "../species/species.entity";
import { Starship } from "../starships/starships.entity";
import { Vehicle } from "../vehicles/vehicles.entity";
import { BaseEntity } from "../config/base-entity";
import { File } from "../../files/file.entity";
import { Film } from "../films/films.entity";
import { IPeopleEntity } from "./people.entity.interfaces";

@Entity({ name: "people" })
export class Person extends BaseEntity implements IPeopleEntity {

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


    
    
    @ManyToOne(() => Planet, (planets) => planets.residents)
    homeworld: Planet;

    @ManyToMany(() => Film, (films) => films.characters)
    films: Film[];

    @ManyToMany(() => Specie, species => species.people)
    @JoinTable({ name: "people_species_relations" })
    species: Specie[];

    @ManyToMany(() => Vehicle, vehicles => vehicles.pilots)
    @JoinTable({ name: "people_vehicles_relations" })
    vehicles: Vehicle[];

    @ManyToMany(() => Starship, starships => starships.pilots)
    @JoinTable({ name: "people_starships_relations" })
    starships: Starship[];

    @ManyToMany(() => File)
    @JoinTable({ name: "people_images_relations" })
    images: File[];
}