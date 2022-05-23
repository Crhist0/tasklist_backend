import express from "express";
import { UserRouter } from "../../features/user/presentation/routes/user-routes";
import { TaskRouter } from "../../features/tasklist/presentation/routes/task-routes";
import swaggerUI from 'swagger-ui-express'
import swaggerConfigs from '../../../swagger.json'

export const makeRoutes = (app: express.Application) => {
    app.use("/user", UserRouter.getRoutes());
    app.use("/task", TaskRouter.getRoutes());
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerConfigs))

};
