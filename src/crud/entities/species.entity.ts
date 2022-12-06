import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class Species extends BaseEntity {
    @Column("varchar")
    name: string;

    @Column("varchar")
    classification: string;

    @Column("varchar")
    designation: string;

    @Column("varchar")
    average_height: string;

    @Column("varchar")
    skin_colors: string;

    @Column("varchar")
    hair_colors: string;

    @Column("varchar")
    eye_colors: string;

    @Column("varchar")
    average_lifespan: string;

    @Column("varchar", {nullable: true})
    homeworld?: string | null;

    @OneToOne(() => Planets, {nullable: true})
    @JoinColumn({name: "homeworldRel"})
    homeworldRel?: Planets;

    @Column("varchar")
    language: string;

    @ManyToMany(() => People, people => people.speciesRel)
    peopleRel?: People[];

    @Column("text")
    people?: string;

    @ManyToMany(() => Films, films => films.speciesRel)
    filmsRel?: Films[];

    @Column("text")
    films?: string;
}