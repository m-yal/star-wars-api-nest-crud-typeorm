import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { File } from "../../files/file.entity";
import { BaseEntity } from "../config/base-entity";
import { Film } from "../films/films.entity";
import { Person } from "../people/people.entity";
import { IVehiclesEntity } from "./vehicles.entity.interfaces";

@Entity({ name: "vehicles" })
export class Vehicle extends BaseEntity implements IVehiclesEntity {

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
    vehicle_class: string;



    @ManyToMany(() => Person, people => people.vehicles)
    pilots: Person[];

    @ManyToMany(() => Film, films => films.vehicles)
    films: Film[];

    @ManyToMany(() => File)
    @JoinTable({ name: "vehicles_images_relations" })
    images: File[];
}