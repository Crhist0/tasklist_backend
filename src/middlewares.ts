import { fetchAccount, Iuser } from "./util";
import { database } from "./data";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

// middlewares para as rotas

let midVerifyNameAndPass = (req: Request, res: Response, next: NextFunction) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    // verifica se os campos name e pass foram preenchidos

    if (!req.body.name && !req.body.pass) {
        res.status(400).send({
            mensagem: `Informe um nome e uma senha.`,
        });
    }
    if (!req.body.name) {
        res.status(400).send({
            mensagem: `Informe um nome.`,
        });
    }
    if (!req.body.pass) {
        res.status(400).send({
            mensagem: `Informe uma senha.`,
        });
    }
    next();
};

let midVerifyRPass = (req: Request, res: Response, next: NextFunction) => {
    let pass = req.body.pass as string;
    let Rpass = req.body.Rpass as string;

    // verifica se os campos Rpass foi preenchido corretamente
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

    // verifica se o usuário existe
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

    // teste nome minimo 3 char
    if (Array.from(name).length < 3) {
        return res.status(400).send({
            mensagem: `O nome ${name} não possui o mínimo de 3 caracteres.`,
        });
    }
    // teste senha minimo 3 char
    if (Array.from(pass).length < 3) {
        return res.status(400).send({
            mensagem: `A senha informada não possui o mínimo de 3 caracteres.`,
        });
    }
    // teste nome repetido
    for (const user of database) {
        if (name == user.name) {
            return res.status(400).send({
                mensagem: `Já existe uma conta de nome ${name}.`,
            });
        }
    }

    next();
};

export { midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability };
