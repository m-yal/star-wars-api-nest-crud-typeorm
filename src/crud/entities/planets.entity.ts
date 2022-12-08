import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class Planets extends BaseEntity {
    @Column("varchar", {default: "unknown"})
    name: string;

    @Column("varchar", {default: "unknown"})
    rotation_period: string;

    @Column("varchar", {default: "unknown"})
    orbital_period: string;

    @Column("varchar", {default: "unknown"})
    diameter: string;

    @Column("varchar", {default: "unknown"})
    climate: string;

    @Column("varchar", {default: "unknown"})
    gravity: string;

    @Column("varchar", {default: "unknown"})
    terrain: string;

    @Column("varchar", {default: "unknown"})
    surface_water: string;

    @Column("varchar", {default: "unknown"})
    population: string;

    @OneToMany(() => People, (people) => people.homeworldRel, {cascade: ["insert"]})
    @JoinTable({name: "planet_peoples_rel"})
    residentsRel: People[];

    @Column("text", {nullable: true})
    residents?: string;

    @ManyToMany(() => Films, (films) => films.planetsRel, {cascade: ["insert"]})
    filmsRel: Films[];

    @Column("text", {nullable: true})
    films?: string;
}