import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id?: number;
    
    @Column("varchar", {nullable: true})
    created?: string;

    @Column("varchar", {nullable: true})
    edited?: string;

    @Column("varchar", {nullable: true})
    url?: string;
}