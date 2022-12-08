import { Column, Entity, ManyToMany } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class Starships extends BaseEntity {
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
    hyperdrive_rating: string;

    @Column("varchar", {default: "unknown"})
    MGLT: string;

    @Column("varchar", {default: "unknown"})
    starship_class: string;

    @ManyToMany(() => People, people => people.starshipsRel, {cascade: ["insert"]})
    pilotsRel: People[];

    @Column("text", {nullable: true})
    pilots?: string;

    @ManyToMany(() => Films, films => films.starshipsRel, {cascade: ["insert"]})
    filmsRel: Films[];

    @Column("text", {nullable: true})
    films?: string;
}