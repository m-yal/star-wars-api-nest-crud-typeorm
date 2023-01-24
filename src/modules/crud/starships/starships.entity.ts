import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { People } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { IStarshipsEntity } from "./starships.entity.interfaces";
import { Files } from "src/modules/files/file.entity";

@Entity()
export class Starships extends BaseEntity implements IStarshipsEntity {

    @Column("varchar", { default: "unknown" })
    model: string;

    @Column("varchar", { default: "unknown" })
    manufacturer: string;

    @Column("int", { nullable: true })
    cost_in_credits: number;

    @Column("int", { nullable: true })
    length: number;

    @Column("int", { nullable: true })
    max_atmosphering_speed: number;

    @Column("int", { nullable: true })
    crew: number;

    @Column("int", { nullable: true })
    passengers: number;

    @Column("int", { nullable: true })
    cargo_capacity: number;

    @Column("varchar", { default: "unknown" })
    consumables: string;

    @Column("int", { nullable: true })
    hyperdrive_rating: number;

    @Column("int", { nullable: true })
    MGLT: number;

    @Column("varchar", { default: "unknown" })
    starship_class: string;




    @ManyToMany(() => People, people => people.starships, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    pilots: People[];

    @ManyToMany(() => Films, films => films.starships, { cascade: ["insert", "update"], onDelete: "CASCADE" })
    films: Films[];

    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({ name: "starships_images_rel" })
    images: Files[];
}