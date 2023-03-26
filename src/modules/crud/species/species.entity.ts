import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { ISpeciesEntity } from "./species.entity.interfaces";
import { Files } from "../../files/entities/file.entity";

@Entity()
export class Species extends BaseEntity implements ISpeciesEntity {

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
    @OneToOne(() => Planets, { nullable: true, /*cascade: ["insert", "update"], onDelete: "CASCADE"*/ })
    @JoinColumn()
    homeworld: Planets;

    @ManyToMany(() => People, people => people.species, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    people: People[];

    @ManyToMany(() => Films, films => films.species, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    films: Films[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "species_images_relaitions"})
    images: Files[];
}