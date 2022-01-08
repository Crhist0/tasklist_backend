import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITask } from "../interfaces/task-interface";
import { User } from "./User";

@Entity({
    name: "task",
    schema: "public",
})
export class Task implements ITask {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    description: string;

    @Column()
    detail: string;

    @ManyToOne(() => User, (user) => user.id, {
        // eager: true, // vem o user todo, com senha e tudo
    })
    user_id: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
