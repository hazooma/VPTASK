import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "int" })
    user_id: number;

}
