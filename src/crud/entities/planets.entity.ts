import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Planets {
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
    residents: People[];

    @ManyToMany(() => Films, (films) => films.planets)
    films: Films[];

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @PrimaryColumn({type: "varchar"})
    url: string;
    
    @Column({type: "varchar", default: ""})
    images: string = "";
}