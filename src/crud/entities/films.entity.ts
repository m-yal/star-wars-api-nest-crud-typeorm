import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";

@Entity()
export class Films {
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

    @ManyToMany(() => People, (people) => people.films)
    @JoinTable()
    characters: People[];

    @ManyToMany(() => Planets, (planets) => planets.films)
    @JoinTable()
    planets: Planets[];

    @ManyToMany(() => Starships, (starhips) => starhips.films)
    @JoinTable()
    starships: Starships[];

    @ManyToMany(() => Vehicles, (vehicles) => vehicles.films)
    @JoinTable()
    vehicles: Vehicles[];

    @ManyToMany(() => Species, (species) => species.films)
    @JoinTable()
    species: Species[];

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @PrimaryColumn({type: "varchar"})
    url: string;
    
    @Column({type: "varchar", default: ""})
    images: string = "";
}