import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "../interfaces/unit.entity.interface";

@Entity()
export abstract class BaseEntity implements UnitEntity{
    @PrimaryGeneratedColumn("increment")
    id?: number;
    
    @Column("varchar", {nullable: true})
    created?: string;

    @Column("varchar", {nullable: true})
    edited?: string;

    @Column("varchar", {nullable: true})
    url?: string;
}