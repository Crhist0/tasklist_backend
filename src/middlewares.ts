import { fetchAccount, Iuser } from "./util";
import { database } from "./data";
import { Request, Response, NextFunction } from "express";

// middlewares para as rotas

let midVerifyNameAndPass = (req: Request, res: Response, next: NextFunction) => {
    console.log("entrou no 'midVerifyNameAndPass'");
    let name = req.body.name as string;
    let pass = req.body.pass as string;
    console.log(`
    name: ${name}
    pass: ${pass}`);

    // verifica se os campos name e pass foram preenchidos

    if (!name && !pass) {
        res.status(400).send({
            mensagem: `Informe um nome e uma senha.`,
        });
    }
    if (!name) {
        res.status(400).send({
            mensagem: `Informe um nome.`,
        });
    }
    if (!pass || pass == "") {
        res.status(400).send({
            mensagem: `Informe uma senha.`,
        });
    }
    next();
};

let midVerifyRPass = (req: Request, res: Response, next: NextFunction) => {
    console.log("entrou no 'midVerifyRPass'");
    let pass = req.body.pass as string;
    let Rpass = req.body.Rpass as string;
    console.log(`
    pass: ${pass}
    Rpass: ${Rpass}
    `);

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
    console.log("entrou no 'midVerifyAccount'");
    let name = req.body.name as string;
    let pass = req.body.pass as string;
    console.log(`
    name: ${name}
    pass: ${pass}
    `);
    let user: Iuser = fetchAccount(name);
    console.log(user);
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
    console.log("entrou no 'midVerifyLenghtAndAvailability'");
    let name = req.body.name as string;
    let pass = req.body.pass as string;
    console.log(`
    name: ${name}
    pass: ${pass}
    `);
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
