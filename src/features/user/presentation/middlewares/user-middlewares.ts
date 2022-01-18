import { Request, Response, NextFunction } from "express";

// middlewares para as rotas de Usuário
class UserImputValidations {
    static VerifyNameAndPass = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        let pass = req.body.pass as string;

        if (!name && !pass) {
            return res.status(403).send({
                mensagem: `Informe um nome e uma senha.`,
            });
        }
        if (!name) {
            return res.status(403).send({
                mensagem: `Informe um nome.`,
            });
        }
        if (!pass) {
            return res.status(403).send({
                mensagem: `Informe uma senha.`,
            });
        }

        next();
    };

    static VerifyRPass = (req: Request, res: Response, next: NextFunction) => {
        let pass = req.body.pass as string;
        let Rpass = req.body.Rpass as string;

        if (!Rpass) {
            return res.status(403).send({
                mensagem: `Repita sua senha.`,
            });
        }
        if (Rpass != pass) {
            return res.status(403).send({
                mensagem: `Repita corretamente sua senha.`,
            });
        }

        next();
    };

    static VerifyLenght = (req: Request, res: Response, next: NextFunction) => {
        let name = req.body.name as string;
        let pass = req.body.pass as string;

        if (Array.from(name).length < 5) {
            return res.status(403).send({
                mensagem: `O nome ${name} não possui o mínimo de 5 caracteres.`,
            });
        }
        if (Array.from(pass).length < 5) {
            return res.status(403).send({
                mensagem: `A senha informada não possui o mínimo de 5 caracteres.`,
            });
        }

        next();
    };
}

export let createAccMids = [
    // Middlewares para criação de conta
    UserImputValidations.VerifyNameAndPass,
    UserImputValidations.VerifyRPass,
    UserImputValidations.VerifyLenght,
];

export let loginMids = [
    // Middlewares para login
    UserImputValidations.VerifyNameAndPass,
    UserImputValidations.VerifyLenght,
];
