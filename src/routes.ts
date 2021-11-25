import { midVerifyDescritionAndDetail, confirmAccountOwnership, midVerifyNameAndPass, midVerifyRPass, midVerifyAccount, midVerifyLenghtAndAvailability, FUNmidPassAlreadyExists } from "./middlewares";
import { exportUser, PushTask, Cuser, hidePass, fetchAccount, Iuser, spyApi, generateTask, saveEditedTask, deleteTask } from "./util";
import { databaseIncrement, devSpy } from "./data";

import express from "express";
var route = express.Router();

// midllewares

let MidsAccCreation = [midVerifyNameAndPass, midVerifyRPass, midVerifyLenghtAndAvailability];
let MidsLogin = [midVerifyNameAndPass, midVerifyAccount];
let MidsAddTask = [midVerifyDescritionAndDetail, confirmAccountOwnership];
let MidsSaveEdit = [midVerifyDescritionAndDetail, confirmAccountOwnership];
let MidsDeleteTask = [confirmAccountOwnership];

// rotas

route.post("/login", MidsLogin, (req: any, res: any) => {
    let name = req.body.name as string;
    let pass = req.body.pass as string;

    let user: Iuser = fetchAccount(name);

    return res.status(200).send({
        mensagem: `Logando na conta de ${name}`,
        dados: exportUser(user),
    });
});

route.post("/create/", MidsAccCreation, (req: any, res: any) => {
    spyApi(req);
    let name = req.body.name as string;
    let pass = req.body.pass as string;
    let newAcc = new Cuser(name, pass);
    databaseIncrement(newAcc);
    return res.status(201).send({
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
    return res.status(200).send({
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

    return res.status(201).send({
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

    return res.status(200).send({
        mensagem: `Tarefa ${description} editada.`,
        dados: exportUser(fetchAccount(name)),
    });
});

route.delete("/deleteTask/", MidsDeleteTask, (req: any, res: any) => {
    let name = req.params.name;
    let index = req.params.index;
    deleteTask(name, index);

    return res.status(200).send({
        mensagem: `Tarefa deletada.`,
        dados: exportUser(fetchAccount(name)),
    });
});

export { route };
