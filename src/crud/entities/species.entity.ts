import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Species {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar")
    name: string;

    @Column("varchar")
    classification: string;

    @Column("varchar")
    designation: string;

    @Column("varchar")
    average_height: string;

    @Column("varchar")
    skin_colors: string;

    @Column("varchar")
    hair_colors: string;

    @Column("varchar")
    eye_colors: string;

    @Column("varchar")
    average_lifespan: string;

    @Column({type: "varchar", nullable: true})
    homeworld: string;

    @Column("varchar")
    language: string;

    @Column("text")
    people: string;

    @Column("text")
    films: string;

    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @Column("varchar")
    url: string;
}