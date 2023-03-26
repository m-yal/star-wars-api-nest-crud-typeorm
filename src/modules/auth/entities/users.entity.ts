import { Column, Entity, PrimaryColumn } from "typeorm";

import { Role } from "./role.enum";

@Entity()
export class Users {

    @PrimaryColumn({ unique: true, type: "varchar" })
    username: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "enum", enum: Role })
    roles: Role;
}