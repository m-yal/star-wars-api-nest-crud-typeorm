import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Films } from "./films.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";
import { BaseEntity } from "./base-entity";

@Entity()
export class People extends BaseEntity {
    @Column("varchar")
    name: string;
    
    @Column("varchar")
    height: string;
    
    @Column("varchar")
    mass: string;
    
    @Column("varchar")
    hair_color: string;
    
    @Column("varchar")
    skin_color: string;
    
    @Column("varchar")
    eye_color: string;
    
    @Column("varchar")
    birth_year: string;
    
    @Column("varchar")
    gender: string;
    
    @ManyToOne(() => Planets, (planets) => planets.residentsRel)
    homeworldRel?: Planets[];

    @Column("varchar")
    homeworld?: string;
    
    @ManyToMany(() => Films, (films) => films.charactersRel)
    filmsRel?: Films[];
    
    @Column("text")
    films?: string;

    @ManyToMany(() => Species, species => species.peopleRel)
    @JoinTable({name: "people_species_rel"})
    speciesRel?: Species[];
    
    @Column("text")
    species?: string;

    @ManyToMany(() => Vehicles, vehicles => vehicles.pilotsRel)
    @JoinTable({name: "people_vehicles_rel"})
    vehiclesRel?: Vehicles[];
    
    @Column("text")
    vehicles?: string;

    @ManyToMany(() => Starships, starships => starships.pilotsRel)
    @JoinTable({name: "people_starships_rel"})
    starshipsRel?: Starships[];
    
    @Column("text")
    starships?: string;
}