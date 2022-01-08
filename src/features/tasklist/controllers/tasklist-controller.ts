import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { Task } from "../../../core/database/entities/Task";
import { ITask } from "../../../core/database/interfaces/task-interface";
import { TaskRepository } from "../../../core/database/repositories/task-repository";

export class TaskController {
    private readonly repository: Repository<Task>;

    constructor() {
        this.repository = new TaskRepository().repository;
    }

    // test controllers
    async read(res: Response) {
        await this.repository
            .find()
            .then((taskList) => {
                return res.status(200).send({
                    taskList,
                });
            })
            .catch((error) => {
                return res.status(400).send({
                    mensagem: "erroro ao tentar obter lista de tarefas.",
                    error,
                });
            });
    }

    async readOneById(res: Response, id: string) {
        await this.repository
            .findOne(id)
            .then((taskList) => {
                return res.status(200).send({
                    taskList,
                });
            })
            .catch((error) => {
                return res.status(400).send({
                    mensagem: "Erro ao tentar obter lista de tarefas.",
                    error,
                });
            });
    }

    // fim test

    async readAllOfUserId(res: Response, token: string) {
        try {
            let decoded = jwt.verify(JSON.parse(token), process.env.SCRT as string) as JwtPayload;
            return await this.repository
                .find({
                    // relations: ["user_id"], // vem o user todo, com senha e tudo
                    where: {
                        user_id: {
                            id: decoded.user.id,
                        },
                    },
                })
                .then((taskList) => {
                    return res.status(200).send({
                        mensagem: "Exibindo lista de tarefas do usuário.",
                        taskList,
                    });
                })
                .catch((error) => {
                    return res.status(400).send({
                        mensagem: "Erro ao tentar obter lista de tarefas do usuário.",
                        error,
                    });
                });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Token inválido, por favor faça login novamente.",
                error,
            });
        }
    }

    create(description: string, detail: string, token: string, res: Response) {
        try {
            var decoded = jwt.verify(token, process.env.SCRT as string) as JwtPayload;

            let newTask: ITask = {
                id: v4(),
                description: description,
                detail: detail,
                user_id: decoded.user.id,
            };

            let newTaskEntity = this.repository.create(newTask);

            this.repository.save(newTaskEntity);

            return res.status(201).send({
                mensagem: `Tarefa ${newTaskEntity.description} criada com sucesso.`,
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao tentar criar uma nova tarefa, faça login novamente.",
                error,
            });
        }
    }

    async update(token: string, id: string, description: string, detail: string, res: Response) {
        try {
            let decoded = jwt.verify(JSON.parse(token), process.env.SCRT as string) as JwtPayload;
            await this.repository.update(id, {
                description: description,
                detail: detail,
            });

            return res.status(200).send({
                mensagem: `Tarefa ${description} editada.`,
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao tentar editar a tarefa, faça login novamente.",
                error,
            });
        }
    }

    async delete(token: string, id: string, res: Response) {
        try {
            let decoded = jwt.verify(JSON.parse(token), process.env.SCRT as string) as JwtPayload;
            await this.repository.delete(id);
            return res.status(200).send({
                mensagem: `Tarefa deletada.`,
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao tentar deletar a tarefa, faça login novamente.",
                error,
            });
        }
    }
}

// anotações

// // raw query
// async create(nome: string, idade: number, cidade: string) {
//     await getConnection().manager.query(`INSERT INTO growdevers.growdever (nome, idade,cidade) VALUES ($1, $2, $3)`, [nome, idade, cidade]);
// }

// //  manager
// async readManager(name: string, pass: string) {
//     let result = await this.connection.manager.find(User);
//     return result;
// }

//  repository
// utilizado mais a fundo acima
