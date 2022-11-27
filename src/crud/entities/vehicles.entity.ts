import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Vehicles {
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
    vehicle_class: string;

    @ManyToMany(() => People, people => people.vehicles)
    pilots: People[];
    
    @ManyToMany(() => Films, films => films.vehicles)
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