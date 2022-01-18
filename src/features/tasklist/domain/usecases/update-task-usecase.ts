import { UseCase } from "../../../../core/domain/contract/usecase";
import { TaskRepository } from "../../infra/repository/task-repository";
import { ITask } from "../models/task";
import { TokenGenerator } from "../../../../core/infra/adapters/jwt-adapter";
import { NotAuthorizedError } from "../errors/token-error";

export interface IUpdateTaskParams {
    token: string;
    task: Partial<ITask>;
}

export class UpdateTaskUsecase implements UseCase {
    constructor(private repository: TaskRepository) {}

    async run(data: IUpdateTaskParams) {
        try {
            // verifica se o token é válido
            let decoded = TokenGenerator.verifyToken(data.token);

            // cria a tarefa
            let newTask: ITask = {
                id: data.task.id as string,
                description: data.task.description as string,
                detail: data.task.detail as string,
                user_id: decoded.payload.userId,
            };

            // atualiza a tarefa
            let updatedTask = await this.repository.update(data.task.id as string, newTask);

            return updatedTask;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}