import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Vehicles extends BaseEntity {
    @Column("varchar", {default: "unknown"})
    name: string;

    @Column("varchar", {default: "unknown"})
    model: string;

    @Column("varchar", {default: "unknown"})
    manufacturer: string;

    @Column("varchar", {default: "unknown"})
    cost_in_credits: string;

    @Column("varchar", {default: "unknown"})
    length: string;

    @Column("varchar", {default: "unknown"})
    max_atmosphering_speed: string;

    @Column("varchar", {default: "unknown"})
    crew: string;

    @Column("varchar", {default: "unknown"})
    passengers: string;

    @Column("varchar", {default: "unknown"})
    cargo_capacity: string;

    @Column("varchar", {default: "unknown"})
    consumables: string;
    
    @Column("varchar", {default: "unknown"})
    vehicle_class: string;

    @ManyToMany(() => People, people => people.vehiclesRel, {cascade: ["insert"]})
    pilotsRel?: People[];

    @Column("text")
    pilots?: string;
    
    @ManyToMany(() => Films, films => films.vehiclesRel, {cascade: ["insert"]})
    filmsRel?: Films[];

    @Column("text")
    films?: string;
}