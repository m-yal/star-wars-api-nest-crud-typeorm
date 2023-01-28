import { Column, Entity, PrimaryColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class Users {

    @PrimaryColumn({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({type: "enum", enum: Role})
    roles: Role;
}