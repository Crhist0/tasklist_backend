import { Request, Response } from "express";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { User } from "../../../core/database/entities/User";
import { IUser } from "../../../core/database/interfaces/user-interface";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../../core/database/repositories/user-repository";

export class UserController {
    private readonly repository: Repository<User>;

    constructor() {
        this.repository = new UserRepository().repository;
    }

    // test controllers
    async read(res: Response) {
        await this.repository
            .find()
            .then((userList) => {
                return res.status(200).send({
                    userList,
                });
            })
            .catch((err) => {
                return res.status(400).send({
                    mensagem: "Erro ao tentar obter lista de usuários.",
                });
            });
    }

    async readOneById(res: Response, id: string) {
        await this.repository
            .findOne(id)
            .then((userList) => {
                return res.status(200).send({
                    userList,
                });
            })
            .catch((err) => {
                return res.status(400).send({
                    mensagem: "Erro ao tentar obter lista de usuários.",
                });
            });
    }
    // fim test

    async readOneByName(res: Response, name: string) {
        return await this.repository
            .find({ name: name })
            .then((userList) => {
                return userList;
            })
            .catch((error) => {
                return res.status(400).send({
                    mensagem: "Erro ao tentar obter lista de usuários.",
                    error,
                });
            });
    }

    login(res: Response, name: string) {
        try {
            this.readOneByName(res, name).then((response) => {
                response = response as User[];
                let user = response[0];

                let token = jwt.sign({ user }, process.env.SCRT as string, { expiresIn: "1h" });

                return res.status(200).send({
                    mensagem: `logando na conta de ${user.name}`,
                    user,
                    token,
                });
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao tentar logar usuário, tente novamente mais tarde.",
                error,
            });
        }
    }

    create(req: Request, res: Response) {
        try {
            let newUser: IUser = {
                id: v4(),
                name: req.body.name,
                pass: req.body.pass,
                taskList: [],
            };

            let newUserEntity = this.repository.create(newUser);

            this.repository.save(newUserEntity);

            return res.status(201).send({
                mensagem: `Conta de ${newUserEntity.name} criada com sucesso.`,
            });
        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao tentar criar um novo usuário, tente novamente mais tarde.",
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
