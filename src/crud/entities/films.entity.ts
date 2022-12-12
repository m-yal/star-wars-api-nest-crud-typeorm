import { FilmsImage } from "src/files/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { People } from "./people.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";

@Entity()
export class Films extends BaseEntity {
    @OneToMany(() => FilmsImage, (filmsImage) => filmsImage.unit, {cascade: ["insert"]})
    @JoinTable({name: "films_images_rel"})
    images: FilmsImage[];

    @Column("varchar", {default: "unknown"})
    title: string;

    @Column("int", {nullable: true})
    episode_id: number

    @Column("text", {nullable: true})
    opening_crawl: string;

    @Column("varchar", {default: "unknown"})
    director: string;

    @Column("varchar", {default: "unknown"})
    producer: string;

    @Column("varchar", {default: "unknown"})
    release_date: string;

    @ManyToMany(() => People, (people) => people.filmsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_people_rel"})
    charactersRel: People[];
    
    @Column("text", {nullable: true})
    characters?: string;

    @ManyToMany(() => Planets, (planets) => planets.filmsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_palnets_rel"})
    planetsRel: Planets[];

    @Column("text", {nullable: true})
    planets?: string;

    @ManyToMany(() => Starships, (starhips) => starhips.filmsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_starships_rel"})
    starshipsRel: Starships[];

    @Column("text", {nullable: true})
    starships?: string;

    @ManyToMany(() => Vehicles, (vehicles) => vehicles.filmsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_vehicles_rel"})
    vehiclesRel: Vehicles[];

    @Column("text", {nullable: true})
    vehicles?: string;

    @ManyToMany(() => Species, (species) => species.filmsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "films_species_rel"})
    speciesRel: Species[];

    @Column("text", {nullable: true})
    species?: string;
}