import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUniversalEntityUnitData } from "../interfaces/common.unit.interfaces";

@Entity()
export abstract class BaseEntity implements IUniversalEntityUnitData {

    @PrimaryColumn({ unique: true })
    name: string;

    @Column("varchar", {default: "unknown", unique: true})
    url?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    edited: Date;
}