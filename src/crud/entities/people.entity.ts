import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Films } from "./films.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";

@Entity()
export class People {
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
    
    @ManyToOne(() => Planets, (planets) => planets.residents)
    homeworld: Planets;
    
    @ManyToMany(() => Films, (films) => films.characters)
    films: Films[];
    
    @ManyToMany(() => Species, species => species.people)
    species: Species[];
    
    @ManyToMany(() => Vehicles, vehicles => vehicles.pilots)
    vehicles: Vehicles[];
    
    @ManyToMany(() => Starships, starships => starships.pilots)
    starships: Starships[];
    
    @Column("varchar")
    created: string;
    
    @Column("varchar")
    edited: string;
    
    @PrimaryColumn({type: "varchar"})
    url: string;

    @Column({type: "varchar", default: ""})
    images: string = "";
}