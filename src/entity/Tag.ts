import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "int" })
    post_id: number;

}
