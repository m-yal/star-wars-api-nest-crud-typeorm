import { Files } from "src/modules/files/file.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "../config/base-entity";
import { Films } from "../films/films.entity";
import { People } from "../people/people.entity";
import { IVehiclesEntity } from "./vehicles.entity.interfaces";

@Entity()
export class Vehicles extends BaseEntity implements IVehiclesEntity {

    @Column("varchar", {default: "unknown"})
    model: string;

    @Column("varchar", {default: "unknown"})
    manufacturer: string;

    @Column("varchar", {default: "unknown"})
    cost_in_credits: number;
    
    @Column("varchar", {default: "unknown"})
    length: number;
    
    @Column("varchar", {default: "unknown"})
    max_atmosphering_speed: number;
    
    @Column("varchar", {default: "unknown"})
    crew: number;
    
    @Column("varchar", {default: "unknown"})
    passengers: number;
    
    @Column("varchar", {default: "unknown"})
    cargo_capacity: number;
    
    @Column("varchar", {default: "unknown"})
    consumables: string;
    
    @Column("varchar", {default: "unknown"})
    vehicle_class: string;
    

    
    @ManyToMany(() => People, people => people.vehicles, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    pilots: People[];
    
    @ManyToMany(() => Films, films => films.vehicles, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    films: Films[];
    
    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({name: "vehicles_images_rel"})
    images: Files[];
}