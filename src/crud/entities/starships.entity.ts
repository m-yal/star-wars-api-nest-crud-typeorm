import { Column, Entity, ManyToMany } from "typeorm";
import { Films } from "./films.entity";
import { People } from "./people.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class Starships extends BaseEntity {
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

    @ManyToMany(() => People, people => people.starshipsRel)
    pilotsRel?: People[];

    @Column("text")
    pilots?: string;

    @ManyToMany(() => Films, films => films.starshipsRel)
    filmsRel?: Films[];

    @Column("text")
    films?: string;
}