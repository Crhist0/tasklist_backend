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
import { TaskController } from "../controllers/tasklist-controller";
import { createTaskMids, editTaskMids } from "../middlewares/task-middlewares";

export class TaskRouter {
    static getRoutes() {
        const routes = Router();
        const controller = new TaskController();

        // test routes

        routes.get("/read", (req: Request, res: Response) => ((req.query.id as string) ? controller.readOneById(res, req.query.id as string) : controller.read(res)));

        // fim test

        routes.get("/readTasksByUserId", (req: Request, res: Response) => ((req.query.token as string) ? controller.readAllOfUserId(res, req.query.token as string) : controller.read(res)));

        routes.post("/create", createTaskMids, (req: Request, res: Response) => controller.create(req.body.description, req.body.detail, req.body.token, res));

        routes.put("/update", editTaskMids, (req: Request, res: Response) => controller.update(req.body.token, req.body.id, req.body.description, req.body.detail, res));

        routes.delete("/delete", (req: Request, res: Response) => controller.delete(req.query.token as string, req.query.id as string, res));

        return routes;
    }
}
