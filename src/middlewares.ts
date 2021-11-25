import { fetchAccount, Iuser } from "./util";
import { database } from "./data";
import { Request, Response, NextFunction } from "express";

// middlewares para as rotas

let midVerifyNameAndPass = (req: Request, res: Response, next: NextFunction) => {
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

let midVerifyRPass = (req: Request, res: Response, next: NextFunction) => {
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

let midVerifyAccount = (req: Request, res: Response, next: NextFunction) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let user: Iuser = fetchAccount(name);

    if (!user) {
        return res.status(404).send({
            mensagem: `Usuário ${name} não encontrado.`,
        });
    }

    // verifica se a senha está correta
    if (user?.pass != pass) {
        return res.status(400).send({
            mensagem: `Senha incorreta.`,
        });
    }

    next();
};

let midVerifyLenghtAndAvailability = (req: Request, res: Response, next: NextFunction) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    if (Array.from(name).length < 3) {
        return res.status(400).send({
            mensagem: `O nome ${name} não possui o mínimo de 3 caracteres.`,
        });
    }
    if (Array.from(pass).length < 3) {
        return res.status(400).send({
            mensagem: `A senha informada não possui o mínimo de 3 caracteres.`,
        });
    }
    for (const user of database) {
        if (name == user.name) {
            return res.status(400).send({
                mensagem: `Já existe uma conta de nome ${name}.`,
            });
        }
    }

    next();
};

let FUNmidPassAlreadyExists = (req: Request, res: Response, next: NextFunction) => {
    let pass = req.body.pass as string;
    for (const user of database) {
        if (user.pass == pass) {
            return res.status(418).send({
                mensagem: `A senha informada já está sendo utilizada pelo usuário ${user.name}.`,
            });
        }
    }
    next();
};

let midVerifyDescritionAndDetail = (req: Request, res: Response, next: NextFunction) => {
    let description = req.body.description;
    let detail = req.body.detail;
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

let confirmAccountOwnershipToCreate = (req: Request, res: Response, next: NextFunction) => {
    let name = req.body.name;
    let token = req.body.token;

    let acc = fetchAccount(name);

    if (acc.token != token) {
        return res.status(401).send({
            titulo: `NÃO AUTORIZADO`,
            mensagem: `Você não deveria estar fazendo isso, faça login novamente.`,
        });
    }
    next();
};

let confirmAccountOwnershipToDelete = (req: Request, res: Response, next: NextFunction) => {
    let name = req.params.name;
    let token = req.get("token");
    // let token = req.headers.token;
    console.log("parametros:");
    console.log(req.params);
    console.log("headers:");
    console.log(req.headers);

    let acc = fetchAccount(name);

    if (acc.token != token) {
        return res.status(401).send({
            titulo: `NÃO AUTORIZADO`,
            mensagem: `Você não deveria estar fazendo isso, faça login novamente.`,
        });
    }
    next();
};

export {
    midVerifyDescritionAndDetail,
    confirmAccountOwnershipToCreate,
    confirmAccountOwnershipToDelete,
    midVerifyNameAndPass,
    midVerifyRPass,
    midVerifyAccount,
    midVerifyLenghtAndAvailability,
    FUNmidPassAlreadyExists,
};
