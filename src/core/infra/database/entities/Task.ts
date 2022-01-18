import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITask } from "../../../../features/tasklist/domain/models/task";
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

    @ManyToOne(() => User, (user) => user.id)
    user_id: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
