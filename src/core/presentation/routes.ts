import express from "express";
import { UserRouter } from "./../../features/user/routes/user-routes";
import { TaskRouter } from "../../features/tasklist/routes/task-routes";

export const makeRoutes = (app: express.Application) => {
    app.use("/user", UserRouter.getRoutes());
    app.use("/task", TaskRouter.getRoutes());
};
