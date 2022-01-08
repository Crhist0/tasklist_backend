// import { MidsAccCreation, MidsLogin, MidsAddTask, MidsSaveEdit, MidsDeleteTask } from "./middlewares";
// import { Cuser, Iuser, spyApi } from "./util";
// // import { exportUser, PushTask, hidePass, fetchAccount, generateTask, saveEditedTask, deleteTask } from "./util";
// import { databaseIncrement, devSpy } from "./data";

// route.post("/addTask/", MidsAddTask, (req: any, res: any) => {
//     let name = req.body.name;
//     let description = req.body.description;
//     let detail = req.body.detail;
//     let position = req.body.position;

//     let task = generateTask(description, detail);
//     let user = fetchAccount(name);

//     PushTask(task, user, position);

//     return res.status(201).send({
//         mensagem: `Tarefa adicionada no ${position > 0 ? `topo` : `final`} da lista`,
//         dados: exportUser(user),
//     });
// });

// route.put("/saveEdit/", MidsSaveEdit, (req: any, res: any) => {
//     let name = req.body.name;
//     let description = req.body.description;
//     let detail = req.body.detail;
//     let index = req.body.index;

//     saveEditedTask(name, description, detail, index);

//     return res.status(200).send({
//         mensagem: `Tarefa ${description} editada.`,
//         dados: exportUser(fetchAccount(name)),
//     });
// });

// route.delete("/deleteTask/:name/:taskIndex", MidsDeleteTask, (req: Request, res: any) => {
//     let name = req.params.name;
//     let taskIndex = Number(req.params.taskIndex);

//     deleteTask(name, taskIndex);

//     return res.status(200).send({
//         mensagem: `Tarefa deletada.`,
//         dados: exportUser(fetchAccount(name)),
//     });
// });

// export { route };

import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user-controller";
import { createAccMids, loginMids } from "../middlewares/user-middlewares";

export class UserRouter {
    static getRoutes() {
        const routes = Router();
        const controller = new UserController();

        // test routes

        routes.get("/read", (req: Request, res: Response) => ((req.query.id as string) ? controller.readOneById(res, req.query.id as string) : controller.read(res)));

        routes.post("/test", (req: Request, res: Response) => controller.login(res, req.body.name));

        // fim test

        routes.post("/create", createAccMids, (req: Request, res: Response) => controller.create(req, res));

        routes.post("/login", loginMids, (req: Request, res: Response) => controller.login(res, req.body.name));

        return routes;
    }
}
