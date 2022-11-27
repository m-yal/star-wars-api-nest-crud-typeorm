import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";

@Entity()
export class Species {
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

    @ManyToOne(() => Planets)
    homeworld: Planets[] | null;

    @Column("varchar")
    language: string;

    @ManyToMany(() => People, people => people.species)
    people: People[];

    @ManyToMany(() => Films, films => films.species)
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