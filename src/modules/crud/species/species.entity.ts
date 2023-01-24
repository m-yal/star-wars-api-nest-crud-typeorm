import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { ISpeciesEntity } from "./species.entity.interfaces";
import { Files } from "src/modules/files/file.entity";

@Entity()
export class Species extends BaseEntity implements ISpeciesEntity {

    /* Base data */
    @Column("varchar", { default: "unknown" })
    classification: string;

    @Column("varchar", { default: "unknown" })
    designation: string;

    @Column("int", { nullable: true })
    average_height: number;

    @Column("varchar", { default: "unknown" })
    skin_colors: string;

    @Column("varchar", { default: "unknown" })
    hair_colors: string;

    @Column("varchar", { default: "unknown" })
    eye_colors: string;

    @Column("int", { nullable: true })
    average_lifespan: number;

    @Column("varchar", { default: "unknown" })
    language: string;



    /* Relations */
    @OneToOne(() => Planets, { nullable: true, cascade: ["insert", "update"], onDelete: "CASCADE" })
    @JoinColumn({ name: "homeworldRel" })
    homeworld: Planets;

    @ManyToMany(() => People, people => people.species, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    people: People[];

    @ManyToMany(() => Films, films => films.species, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    films: Films[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({ name: "species_images_rel" })
    images: Files[];
}