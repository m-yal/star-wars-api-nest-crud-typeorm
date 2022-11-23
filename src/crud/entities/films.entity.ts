import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Films {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    title: string;

    @Column("int")
    episode_id: number

    @Column("text")
    opening_crawl: string;

    @Column("varchar")
    director: string;

    @Column("varchar")
    producer: string;

    @Column("varchar")
    release_date: string;

    @Column("text")
    characters: string;

    @Column("text")
    planets: string;

    @Column("text")
    starships: string;

    @Column("text")
    vehicles: string;

    @Column("text")
    species: string;

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @Column("varchar")
    url: string;
}