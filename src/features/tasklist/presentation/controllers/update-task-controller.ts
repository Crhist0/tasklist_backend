import { ITask } from "../../domain/models/task";
import { ok, serverError } from "../../../../core/presentation/helper/http-handler";
import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contract/controller";
import { IUpdateTaskParams, UpdateTaskUsecase } from "../../domain/usecases/update-task-usecase";

export class UpdateTaskController implements Controller {
    constructor(private updateTaskUsecase: UpdateTaskUsecase) {}

    async execute(req: Request, res: Response) {
        try {
            let token: string = req.body.token;
            let id: string = req.body.id;
            let description: string = req.body.description;
            let detail: string = req.body.detail;

            let task: Partial<ITask> = {
                id,
                description,
                detail,
            };

            let data: IUpdateTaskParams = {
                token: token,
                task,
            };

            let result = await this.updateTaskUsecase.run(data);

            return ok(res, result);
        } catch (error) {
            return serverError(res, error);
        }
    }
}
