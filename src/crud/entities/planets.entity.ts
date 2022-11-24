import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Planets {
    @PrimaryGeneratedColumn("increment")
    id: number;

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

    @Column("text")
    residents: string;

    @Column("text")
    films: string;

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @Column("varchar")
    url: string;
    
    @Column({type: "varchar", default: ""})
    images: string = "";
}