import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUniversalEntityUnitData } from "../interfaces/common.unit.interfaces";

@Entity()
export abstract class BaseEntity implements IUniversalEntityUnitData {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column("varchar", { unique: true })
    name: string;

    @Column("varchar", { default: "unknown" })
    url?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created?: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    edited?: Date;
}