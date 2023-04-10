import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { Person } from "../people/people.entity";
import { BaseEntity } from "../config/base-entity";
import { Film } from "../films/films.entity";
import { IStarshipsEntity } from "./starships.entity.interfaces";
import { File } from "../../files/file.entity";

@Entity({ name: "starships" })
export class Starship extends BaseEntity implements IStarshipsEntity {

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




    @ManyToMany(() => Person, people => people.starships)
    pilots: Person[];

    @ManyToMany(() => Film, films => films.starships)
    films: Film[];

    @ManyToMany(() => File)
    @JoinTable({ name: "starships_images_relations" })
    images: File[];
}