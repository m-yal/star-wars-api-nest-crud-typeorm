import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class People {
    @PrimaryGeneratedColumn("increment")
    id: number;

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
    
    @Column("varchar")
    homeworld: string;
    
    @Column("text")
    films: string;
    
    @Column("text")
    species: string;
    
    @Column("text")
    vehicles: string;
    
    @Column("text")
    starships: string;
    
    @Column("varchar")
    created: string;
    
    @Column("varchar")
    edited: string;
    
    @Column("varchar")
    url: string;
}