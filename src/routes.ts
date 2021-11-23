import { midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability } from "./middlewares";
import { Cuser, hidePass, fetchAccount, Iuser } from "./util";
import { database, databaseIncrement, userIdPlus, logInUser, logOutUser, devSpy } from "./data";

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
});

route.post("/create/", midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability, (req: any, res: any) => {
    console.log("entrou na rota");
    let name = req.body.name as string;
    let pass = req.body.pass as string;
    console.log(`
    name: ${name}
    pass: ${pass}`);

    let newAcc = new Cuser(name, pass);
    console.log(newAcc);
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

route.get("/dev", (req: any, res: any) => {
    res.status(200).send({
        mensagem: `Verificando database`,
        dados: devSpy(),
    });
});

// route.delete("")

export { route };
