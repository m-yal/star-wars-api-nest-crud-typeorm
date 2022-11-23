import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Starships {
    @PrimaryGeneratedColumn("increment")
    id: number;

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

    @Column("text")
    pilots: string;

    @Column("text")
    films: string;

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @Column("varchar")
    url: string;
}