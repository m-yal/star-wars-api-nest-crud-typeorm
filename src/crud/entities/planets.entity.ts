import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Planets extends BaseEntity {
    @Column("varchar")
    name: string;

    @Column("varchar")
    rotation_period: string;

    @Column("varchar")
    orbital_period: string;

    @Column("varchar")
    diameter: string;

    @Column("varchar")
    climate: string;

    @Column("varchar")
    gravity: string;

    @Column("varchar")
    terrain: string;

    @Column("varchar")
    surface_water: string;

    @Column("varchar")
    population: string;

    @OneToMany(() => People, (people) => people.homeworld)
    residentsRel?: People[];

    @Column("text")
    residents?: string;

    @ManyToMany(() => Films, (films) => films.planets)
    filmsRel?: Films[];

    @Column("text")
    films?: string;
}