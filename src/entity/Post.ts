import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    title: string;

    @Column({ type: "varchar" })
    body: string;

    @Column({ type: "boolean", default: false })
    hidden: Boolean;


    @Column({ type: "int" })
    user_id: number;




}
