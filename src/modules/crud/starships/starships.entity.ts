import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { People } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { IStarshipsEntity } from "./starships.entity.interfaces";
import { Files } from "../../files/entities/file.entity";

@Entity()
export class Starships extends BaseEntity implements IStarshipsEntity {

    @Column()
    model: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: string;

    @Column()
    length: string;

    @Column()
    max_atmosphering_speed: string;

    @Column()
    crew: string;

    @Column()
    passengers: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column()
    hyperdrive_rating: string;

    @Column()
    MGLT: string;

    @Column()
    starship_class: string;




    @ManyToMany(() => People, people => people.starships, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    pilots: People[];

    @ManyToMany(() => Films, films => films.starships, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    films: Films[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "starships_images_relations" })
    images: Files[];
}