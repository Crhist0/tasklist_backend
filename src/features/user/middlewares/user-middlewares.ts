import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../core/database/interfaces/user-interface";
import { UserController } from "../controllers/user-controller";

// middlewares para as rotas

class UserMiddlewares {
    static VerifyNameAndPass = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        let pass = req.body.pass as string;

        if (!name && !pass) {
            return res.status(400).send({
                mensagem: `Informe um nome e uma senha.`,
            });
        }
        if (!name) {
            return res.status(400).send({
                mensagem: `Informe um nome.`,
            });
        }
        if (!pass) {
            return res.status(400).send({
                mensagem: `Informe uma senha.`,
            });
        }

        next();
    };

    static VerifyRPass = (req: Request, res: Response, next: NextFunction) => {
        let pass = req.body.pass as string;
        let Rpass = req.body.Rpass as string;

        if (!Rpass) {
            return res.status(400).send({
                mensagem: `Repita sua senha.`,
            });
        }
        if (Rpass != pass) {
            return res.status(400).send({
                mensagem: `Repita corretamente sua senha.`,
            });
        }

        next();
    };

    static VerifyLenght = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        let pass = req.body.pass as string;

        if (Array.from(name).length < 5) {
            return res.status(400).send({
                mensagem: `O nome ${name} não possui o mínimo de 5 caracteres.`,
            });
        }
        if (Array.from(pass).length < 5) {
            return res.status(400).send({
                mensagem: `A senha informada não possui o mínimo de 5 caracteres.`,
            });
        }

        next();
    };

    static VerifyAvailability = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        new UserController().readOneByName(res, name).then((response) => {
            let userList = response as unknown as IUser[]; // gambi pro type não reclamar :/
            for (const user of userList) {
                if (name == user.name) {
                    return res.status(400).send({
                        mensagem: `Já existe uma conta de nome ${name}.`,
                    });
                }
            }
            next();
        });
    };

    static VerifyLogin = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        let pass = req.body.pass as string;

        new UserController().readOneByName(res, name).then((response) => {
            let userList = response as unknown as IUser[]; // gambi pro type não reclamar :/

            if (userList[0] == undefined) {
                return res.status(404).send({
                    mensagem: `Usuário ${name} não encontrado.`,
                });
            }

            if (userList[0].pass != pass) {
                return res.status(400).send({
                    mensagem: `Senha incorreta.`,
                });
            }

            next();
        });
    };
}

export let createAccMids = [
    // Middlewares
    UserMiddlewares.VerifyNameAndPass,
    UserMiddlewares.VerifyRPass,
    UserMiddlewares.VerifyLenght,
    UserMiddlewares.VerifyAvailability,
];

export let loginMids = [
    // Middlewares
    UserMiddlewares.VerifyNameAndPass,
    UserMiddlewares.VerifyLenght,
    UserMiddlewares.VerifyLogin,
];

// let midVerifyDescritionAndDetail = (req: Request, res: Response, next: NextFunction) => {
//     let description = req.body.description;
//     let detail = req.body.detail;
//     if (!description && !detail) {
//         return res.status(400).send({
//             mensagem: `Insira uma descrição e um detalhamento.`,
//         });
//     } else if (!description) {
//         return res.status(400).send({
//             mensagem: `Insira uma descrição.`,
//         });
//     } else if (!detail) {
//         return res.status(400).send({
//             mensagem: `Insira um detalhamento.`,
//         });
//     }
//     next();
// };

// let confirmAccountOwnershipToCreate = (req: Request, res: Response, next: NextFunction) => {
//     let name = req.body.name;
//     let token = req.body.token;

//     let acc = fetchAccount(name);

//     if (acc.token != token) {
//         return res.status(401).send({
//             titulo: `NÃO AUTORIZADO`,
//             mensagem: `Você não deveria estar fazendo isso, faça login novamente.`,
//         });
//     }
//     next();
// };

// let confirmAccountOwnershipToDelete = (req: Request, res: Response, next: NextFunction) => {
//     let name = req.params.name;
//     let token = req.get("token");

//     let acc = fetchAccount(name);

//     if (acc.token != token) {
//         return res.status(401).send({
//             titulo: `NÃO AUTORIZADO`,
//             mensagem: `Você não deveria estar fazendo isso, faça login novamente.`,
//         });
//     }
//     next();
// };

// let MidsAccCreation = [midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability];
// let MidsLogin = [midVerifyNameAndPass, midVerifyAccount];
// let MidsAddTask = [midVerifyDescritionAndDetail, confirmAccountOwnershipToCreate];
// let MidsSaveEdit = [midVerifyDescritionAndDetail, confirmAccountOwnershipToCreate];
// let MidsDeleteTask = [confirmAccountOwnershipToDelete];

// export { MidsAccCreation, MidsLogin, MidsAddTask, MidsSaveEdit, MidsDeleteTask };
