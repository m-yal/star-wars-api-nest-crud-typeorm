import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Vehicles extends BaseEntity {
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

    @ManyToMany(() => People, people => people.vehiclesRel)
    pilotsRel?: People[];

    @Column("text")
    pilots?: string;
    
    @ManyToMany(() => Films, films => films.vehiclesRel)
    filmsRel?: Films[];

    @Column("text")
    films?: string;
}