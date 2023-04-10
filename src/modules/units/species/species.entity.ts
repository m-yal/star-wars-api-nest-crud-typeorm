import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

import { Person } from "../people/people.entity";
import { Planet } from "../planets/planets.entity";
import { BaseEntity } from "../config/base-entity";
import { Film } from "../films/films.entity";
import { ISpeciesEntity } from "./species.entity.interfaces";
import { File } from "../../files/file.entity";

@Entity({ name: "species" })
export class Specie extends BaseEntity implements ISpeciesEntity {

    /* Base data */
    @Column()
    classification: string;

    @Column()
    designation: string;

    @Column()
    average_height: string;

    @Column()
    skin_colors: string;

    @Column()
    hair_colors: string;

    @Column()
    eye_colors: string;

    @Column()
    average_lifespan: string;

    @Column()
    language: string;



    /* Relations */
    @OneToOne(() => Planet, { nullable: true })
    @JoinColumn()
    homeworld: Planet;

    @ManyToMany(() => Person, people => people.species)
    people: Person[];

    @ManyToMany(() => Film, films => films.species)
    films: Film[];

    @ManyToMany(() => File)
    @JoinTable({ name: "species_images_relaitions"})
    images: File[];
}