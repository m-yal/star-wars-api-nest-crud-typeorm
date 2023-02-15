import { Files } from "src/modules/files/file.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";
import { IVehiclesEntity } from "./vehicles.entity.interfaces";

@Entity()
export class Vehicles extends BaseEntity implements IVehiclesEntity {

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



    @ManyToMany(() => People, people => people.vehicles, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    pilots: People[];

    @ManyToMany(() => Films, films => films.vehicles, /*{ cascade: ["insert", "update"], onDelete: "CASCADE" }*/)
    films: Films[];

    @ManyToMany(() => Files)
    @JoinTable({ name: "vehicles_images_relations" })
    images: Files[];
}