import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;
    
    @Column("varchar")
    created: string;

    @Column("varchar")
    edited: string;

    @Column("varchar")
    url: string;
    
    @Column({type: "varchar", default: ""})
    images: string = "";
}