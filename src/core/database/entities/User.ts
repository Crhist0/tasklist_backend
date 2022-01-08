import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ITask } from "../interfaces/task-interface";
import { IUser } from "../interfaces/user-interface";
import { Task } from "./Task";

@Entity({
    name: "user",
    schema: "public",
})
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50 })
    pass: string;

    @OneToMany(() => Task, (task) => task)
    taskList: ITask[];
}

// anotações

// criar entidade
// npx typeorm entity:create -n NomeDaTabela

// cria migration
// npx typeorm migration:create -n NomeDaMigration

// cria a table pela entidade
// npm run typeorm migration:generate -- -n CreateUser

// @PrimaryColumn = coluna+PK
// @Column = colunaclear
