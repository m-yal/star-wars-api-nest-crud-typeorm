import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Starships {
    @Column("varchar")
    name: string;

    @Column("varchar")
    model: string;

    @Column("varchar")
    manufacturer: string;

    @Column("varchar")
    cost_in_credits: string;

    @Column("varchar")
    length: string;

    @Column("varchar")
    max_atmosphering_speed: string;

    @Column("varchar")
    crew: string;

    @Column("varchar")
    passengers: string;

    @Column("varchar")
    cargo_capacity: string;

    @Column("varchar")
    consumables: string;

    @Column("varchar")
    hyperdrive_rating: string;

    @Column("varchar")
    MGLT: string;

    @Column("varchar")
    starship_class: string;

    @ManyToMany(() => People, people => people.starships)
    pilots: People[];

    @ManyToMany(() => Films, films => films.starships)
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