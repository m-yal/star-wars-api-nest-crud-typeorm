import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class Species extends BaseEntity {
    @Column("varchar", {default: "unknown"})
    name: string;

    @Column("varchar", {default: "unknown"})
    classification: string;

    @Column("varchar", {default: "unknown"})
    designation: string;

    @Column("varchar", {default: "unknown"})
    average_height: string;

    @Column("varchar", {default: "unknown"})
    skin_colors: string;

    @Column("varchar", {default: "unknown"})
    hair_colors: string;

    @Column("varchar", {default: "unknown"})
    eye_colors: string;

    @Column("varchar", {default: "unknown"})
    average_lifespan: string;

    @Column("varchar", {nullable: true})
    homeworld?: string | null;

    @OneToOne(() => Planets, {nullable: true, cascade: ["insert"]})
    @JoinColumn({name: "homeworldRel"})
    homeworldRel: Planets;

    @Column("varchar", {default: "unknown"})
    language: string;

    @ManyToMany(() => People, people => people.speciesRel, {cascade: ["insert"]})
    peopleRel: People[];

    @Column("text", {nullable: true})
    people?: string;

    @ManyToMany(() => Films, films => films.speciesRel, {cascade: ["insert"]})
    filmsRel: Films[];

    @Column("text", {nullable: true})
    films?: string;
}