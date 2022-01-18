import { TokenGenerator } from "./../../../../core/infra/adapters/jwt-adapter";
import { UseCase } from "../../../../core/domain/contract/usecase";
import { TaskRepository } from "../../infra/repository/task-repository";
import { ITask } from "../models/task";
import { GenerateUid } from "../../../../core/infra/adapters/uuidGenerator";

export interface ICreateTaskParams {
    token: string;
    task: Partial<ITask>;
}

export class CreateTaskUsecase implements UseCase {
    constructor(private repository: TaskRepository) {}

    async run(data: ICreateTaskParams) {
        try {
            // verifica se o token é válido
            let decoded = TokenGenerator.verifyToken(data.token);

            // cria a tarefa
            let newTask: ITask = {
                id: GenerateUid.newUUID(),
                description: data.task.description as string,
                detail: data.task.detail as string,
                user_id: decoded.payload.userId,
            };

            // salva a tarefa
            let savedTask = await this.repository.create(newTask);

            return savedTask;
        } catch (error) {
            return error;
        }
    }
}
