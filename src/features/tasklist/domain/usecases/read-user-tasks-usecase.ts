import { UseCase } from "../../../../core/domain/contract/usecase";
import { TokenGenerator } from "../../../../core/infra/adapters/jwt-adapter";
import { serverError } from "../../../../core/presentation/helper/http-handler";
import { TaskRepository } from "../../infra/repository/task-repository";
import { NotAuthorizedError } from "../errors/token-error";
import { ITask } from "../models/task";

export interface IReadUserTasksParams {
    token: string;
}

export class ReadUserTasksUsecase implements UseCase {
    constructor(private repository: TaskRepository) {}

    async run(data: IReadUserTasksParams) {
        try {
            // verifica se o token é válido
            let decoded = TokenGenerator.verifyToken(data.token);

            let taskList: ITask[] = await this.repository.readAllOfId(decoded.payload.userId);

            return taskList;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}
