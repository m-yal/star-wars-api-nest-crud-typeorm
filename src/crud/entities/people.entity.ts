import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Films } from "./films.entity";
import { Planets } from "./planets.entity";
import { Species } from "./species.entity";
import { Starships } from "./starships.entity";
import { Vehicles } from "./vehicles.entity";
import { BaseEntity } from "./base-entity";
import { PeopleImage } from "src/files/entities/image.entity";

@Entity()
export class People extends BaseEntity {
    @OneToMany(() => PeopleImage, (peopleImage) => peopleImage.unit, {cascade: ["insert"]})
    @JoinTable({name: "people_images_rel"})
    images?: PeopleImage[];
    
    @Column("varchar", {default: "unknown"})
    name?: string;
    
    @Column("varchar", {default: "unknown"})
    height?: string;
    
    @Column("varchar", {default: "unknown"})
    mass?: string;
    
    @Column("varchar", {default: "unknown"})
    hair_color?: string;
    
    @Column("varchar", {default: "unknown"})
    skin_color?: string;
    
    @Column("varchar", {default: "unknown"})
    eye_color?: string;
    
    @Column("varchar", {default: "unknown"})
    birth_year?: string;
    
    @Column("varchar", {default: "unknown"})
    gender?: string;
    
    @ManyToOne(() => Planets, (planets) => planets.residentsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    homeworldRel?: Planets;

    @Column("varchar", {nullable: true})
    homeworld?: string;
    
    @ManyToMany(() => Films, (films) => films.charactersRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    filmsRel?: Films[];
    
    @Column("text", {nullable: true})
    films?: string;

    @ManyToMany(() => Species, species => species.peopleRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "people_species_rel"})
    speciesRel?: Species[];
    
    @Column("text", {nullable: true})
    species?: string;

    @ManyToMany(() => Vehicles, vehicles => vehicles.pilotsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "people_vehicles_rel"})
    vehiclesRel?: Vehicles[];
    
    @Column("text", {nullable: true})
    vehicles?: string;

    @ManyToMany(() => Starships, starships => starships.pilotsRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    @JoinTable({name: "people_starships_rel"})
    starshipsRel?: Starships[];
    
    @Column("text", {nullable: true})
    starships?: string;
}