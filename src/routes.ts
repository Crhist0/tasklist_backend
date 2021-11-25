import { midVerifyDescritionAndDetail, confirmAccountOwnership, midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability, FUNmidPassAlreadyExists } from "./middlewares";
import { exportUser, PushTask, Itask, Cuser, hidePass, fetchAccount, Iuser, spyApi, generateTask } from "./util";
import { database, databaseIncrement, userIdPlus, logInUser, logOutUser, devSpy, taskId } from "./data";

import express from "express";
var route = express.Router();

// midllewares

let MidsAccCreation = [midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability];
let MidsLogin = [midVerifyNameAndPass, midVerifyAccount];
let MidsAddTask = [midVerifyDescritionAndDetail, confirmAccountOwnership];

// rotas

route.post("/login", MidsLogin, (req: any, res: any) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let user: Iuser = fetchAccount(name);

    logInUser(user);

    res.status(200).send({
        mensagem: `Ok, logando na conta de ${name}`,
        dados: exportUser(user),
    });
});

route.post("/create/", MidsAccCreation, (req: any, res: any) => {
    spyApi(req);
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
        mensagem: `Conta de ${name} criada com sucesso`,
        dados: {
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

route.post("/addTask/", MidsAddTask, (req: any, res: any) => {
    let name = req.body.name;
    let description = req.body.description;
    let detail = req.body.detail;
    let position = req.body.position;

    let task = generateTask(description, detail);
    let user = fetchAccount(name);

    PushTask(task, user, position);

    res.status(201).send({
        Mensagem: `Tarefa adicionada no ${position > 0 ? `topo` : `final`} da lista`,
        Dados: exportUser(user),
    });
});

// route.delete("")

export { route };
