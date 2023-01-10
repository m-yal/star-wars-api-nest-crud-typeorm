import { StarshipsImage } from "src/modules/files/config/entities/image.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { Films } from "./films.entity";
import { People } from "./people.entity";

@Entity()
export class Vehicles extends BaseEntity {
    @OneToMany(() => StarshipsImage, (starshipsImage) => starshipsImage.unit, {onDelete: "CASCADE"})
    @JoinTable({name: "vehicles_images_rel"})
    images?: StarshipsImage[];
    
    @Column("varchar", {default: "unknown"})
    name?: string;

    @Column("varchar", {default: "unknown"})
    model?: string;

    @Column("varchar", {default: "unknown"})
    manufacturer?: string;

    @Column("varchar", {default: "unknown"})
    cost_in_credits?: string;

    @Column("varchar", {default: "unknown"})
    length?: string;

    @Column("varchar", {default: "unknown"})
    max_atmosphering_speed?: string;

    @Column("varchar", {default: "unknown"})
    crew?: string;

    @Column("varchar", {default: "unknown"})
    passengers?: string;

    @Column("varchar", {default: "unknown"})
    cargo_capacity?: string;

    @Column("varchar", {default: "unknown"})
    consumables?: string;
    
    @Column("varchar", {default: "unknown"})
    vehicle_class?: string;

    @ManyToMany(() => People, people => people.vehiclesRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    pilotsRel?: People[];

    @Column("text", {nullable: true})
    pilots?: string;
    
    @ManyToMany(() => Films, films => films.vehiclesRel, {cascade: ["insert", "update"], onDelete: "CASCADE"})
    filmsRel?: Films[];

    @Column("text", {nullable: true})
    films?: string;
}