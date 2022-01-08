import { Request, Response, NextFunction } from "express";
import { TaskController } from "../controllers/tasklist-controller";

// middlewares para as rotas

class TaskMiddlewares {
    static VerifyFields = (req: Request, res: Response, next: NextFunction) => {
        let description = req.body.description as string;
        let detail = req.body.detail as string;

        if (!description && !detail) {
            return res.status(400).send({
                mensagem: `Insira uma descrição e um detalhamento.`,
            });
        } else if (!description) {
            return res.status(400).send({
                mensagem: `Insira uma descrição.`,
            });
        } else if (!detail) {
            return res.status(400).send({
                mensagem: `Insira um detalhamento.`,
            });
        }
        next();
    };

    static VerifyMaxLenght = (req: Request, res: Response, next: NextFunction) => {
        let description = req.body.description as string;
        let detail = req.body.detail as string;

        if (Array.from(description).length > 50) {
            return res.status(400).send({
                mensagem: `A descrição não pode exceder 50 caracteres. Sua descrição possui ${Array.from(description).length} caracteres.`,
            });
        }
        if (Array.from(detail).length > 500) {
            return res.status(400).send({
                mensagem: `O detalhamento não pode exceder 500 caracteres. Seu detalhamento possui ${Array.from(detail).length} caracteres.`,
            });
        }

        next();
    };

    // static VerifyAvailability = (req: Request, res: Response, next: NextFunction) => {
    //     let name = req.body.name as string;
    //     new TaskController().readOneByName(res, name).then((response) => {
    //         let userList = response as unknown as IUser[]; // gambi pro type não reclamar :/
    //         for (const user of userList) {
    //             if (name == user.name) {
    //                 return res.status(400).send({
    //                     mensagem: `Já existe uma conta de nome ${name}.`,
    //                 });
    //             }
    //         }
    //         next();
    //     });
    // };

    // static VerifyLogin = (req: Request, res: Response, next: NextFunction) => {
    //     let name = req.body.name as string;
    //     let pass = req.body.pass as string;

    //     new TaskController().readOneByName(res, name).then((response) => {
    //         let userList = response as unknown as IUser[]; // gambi pro type não reclamar :/

    //         if (userList[0] == undefined) {
    //             return res.status(404).send({
    //                 mensagem: `Usuário ${name} não encontrado.`,
    //             });
    //         }

    //         if (userList[0].pass != pass) {
    //             return res.status(400).send({
    //                 mensagem: `Senha incorreta.`,
    //             });
    //         }

    //         next();
    //     });
    // };
}

export let createTaskMids = [
    //
    TaskMiddlewares.VerifyFields,
    TaskMiddlewares.VerifyMaxLenght,
];

export let editTaskMids = [
    //
    TaskMiddlewares.VerifyFields,
    TaskMiddlewares.VerifyMaxLenght,
];

// let midVerifyDescritionAndDetail = (req: Request, res: Response, next: NextFunction) => {
//     let description = req.body.description;
//     let detail = req.body.detail;

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
