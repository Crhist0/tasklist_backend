import { midVerifyDescritionAndDetail, confirmAccountOwnership, midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability, FUNmidPassAlreadyExists } from "./middlewares";
import { exportUser, PushTask, Itask, Cuser, hidePass, fetchAccount, Iuser, spyApi, generateTask, saveEditedTask } from "./util";
import { database, databaseIncrement, userIdPlus, logInUser, logOutUser, devSpy, taskId } from "./data";

import express from "express";
var route = express.Router();

// midllewares

let MidsAccCreation = [midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability];
let MidsLogin = [midVerifyNameAndPass, midVerifyAccount];
let MidsAddTask = [midVerifyDescritionAndDetail, confirmAccountOwnership];
let MidsSaveEdit = [midVerifyDescritionAndDetail, confirmAccountOwnership];

// rotas

route.post("/login", MidsLogin, (req: any, res: any) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let user: Iuser = fetchAccount(name);

    logInUser(user);

    res.status(200).send({
        mensagem: `Logando na conta de ${name}`,
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
        mensagem: `Tarefa adicionada no ${position > 0 ? `topo` : `final`} da lista`,
        dados: exportUser(user),
    });
});

route.put("/saveEdit/", MidsSaveEdit, (req: any, res: any) => {
    let name = req.body.name;
    let description = req.body.description;
    let detail = req.body.detail;
    let index = req.body.index;

    saveEditedTask(name, description, detail, index);

    res.status(200).send({
        mensagem: `Tarefa ${description} editada.`,
        dados: exportUser(fetchAccount(name)),
    });
});

// route.delete("")

export { route };
