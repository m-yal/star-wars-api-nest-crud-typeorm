import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";

@Entity()
export class Films extends BaseEntity {
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

    @ManyToMany(() => People, (people) => people.filmsRel)
    @JoinTable({name: "films_people_rel"})
    charactersRel?: People[];
    
    @Column("text")
    characters?: string;

    @ManyToMany(() => Planets, (planets) => planets.filmsRel)
    @JoinTable({name: "films_palnets_rel"})
    planetsRel?: Planets[];

    @Column("text")
    planets?: string;

    @ManyToMany(() => Starships, (starhips) => starhips.filmsRel)
    @JoinTable({name: "films_starships_rel"})
    starshipsRel?: Starships[];

    @Column("text")
    starships?: string;

    @ManyToMany(() => Vehicles, (vehicles) => vehicles.filmsRel)
    @JoinTable({name: "films_vehicles_rel"})
    vehiclesRel?: Vehicles[];

    @Column("text")
    vehicles?: string;

    @ManyToMany(() => Species, (species) => species.filmsRel)
    @JoinTable({name: "films_species_rel"})
    speciesRel?: Species[];

    @Column("text")
    species?: string;
}