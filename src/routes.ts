import { midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability } from "./middlewares";
import { Cuser, hidePass, fetchAccount, Iuser } from "./util";
import { database, databaseIncrement, userIdPlus, logInUser, logOutUser } from "./data";

import express from "express";
var route = express.Router();

// rotas

route.get("/index", midVerifyNameAndPass, midVerifyAccount, (req: any, res: any) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let user: Iuser = fetchAccount(name);

    logInUser(user);

    res.status(200).send({
        mensagem: `Ok, logando na conta de ${name}`,
        dados: {
            id: user?.id,
            nome: name,
            pass: hidePass(pass),
        },
    });

    window.location.assign("taskList.html");
});

route.post("/create/", midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability, (req: any, res: any) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let newAcc = new Cuser(name, pass);
    databaseIncrement(newAcc);
    userIdPlus();

    res.status(201).send({
        Mensagem: `Conta de ${name} criada com sucesso`,
        Dados: {
            id: newAcc.id,
            name: name,
            pass: hidePass(pass),
            creationDate: newAcc.birth.message,
        },
    });
});

export { route };
