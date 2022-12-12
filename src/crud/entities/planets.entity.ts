import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { BaseEntity } from "./base-entity";
import { PlanetsImage } from "src/files/entities/image.entity";

@Entity()
export class Planets extends BaseEntity {
    @OneToMany(() => PlanetsImage, (planetsImage) => planetsImage.unit, {cascade: ["insert"]})
    @JoinTable({name: "planets_images_rel"})
    images?: PlanetsImage[];
    
    @Column("varchar", {default: "unknown"})
    name?: string;

    @Column("varchar", {default: "unknown"})
    rotation_period?: string;

    @Column("varchar", {default: "unknown"})
    orbital_period?: string;

    @Column("varchar", {default: "unknown"})
    diameter?: string;

    @Column("varchar", {default: "unknown"})
    climate?: string;

    @Column("varchar", {default: "unknown"})
    gravity?: string;

    @Column("varchar", {default: "unknown"})
    terrain?: string;

    @Column("varchar", {default: "unknown"})
    surface_water?: string;

    @Column("varchar", {default: "unknown"})
    population?: string;

    @OneToMany(() => People, (people) => people.homeworldRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "planet_peoples_rel"})
    residentsRel?: People[];

    @Column("text", {nullable: true})
    residents?: string;

    @ManyToMany(() => Films, (films) => films.planetsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    filmsRel?: Films[];

    @Column("text", {nullable: true})
    films?: string;
}