import { Files } from "src/modules/files/file.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "../config/base-entity";
import { People } from "../people/people.entity";
import { Planets } from "../planets/planets.entity";
import { Species } from "../species/species.entity";
import { Starships } from "../starships/starships.entity";
import { Vehicles } from "../vehicles/vehicles.entity";
import { IFilmsEntity } from "./films.entity.interfaces";

@Entity()
export class Films extends BaseEntity implements IFilmsEntity {

    @Column("int", {nullable: true})
    episode_id: number

    @Column("text", {nullable: true})
    opening_crawl: string;

    @Column("varchar", {default: "unknown"})
    director: string;

    @Column("varchar", {default: "unknown"})
    producer: string;

    @Column({ type: 'date', default: '1970-01-01' })
    release_date: Date;




    
    @ManyToMany(() => People, (people) => people.films, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_people_rel"})
    characters: People[];
    
    @ManyToMany(() => Planets, (planets) => planets.films, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_palnets_rel"})
    planets: Planets[];

    @ManyToMany(() => Starships, (starhips) => starhips.films, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_starships_rel"})
    starships: Starships[];
    
    @ManyToMany(() => Vehicles, (vehicles) => vehicles.films, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_vehicles_rel"})
    vehicles: Vehicles[];

    @ManyToMany(() => Species, (species) => species.films, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_species_rel"})
    species: Species[];
    
    @OneToMany(() => Files, (files) => files.name)
    @JoinTable({name: "films_images_rel"})
    images: Files[];
}