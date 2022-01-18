import { UseCase } from "../../../../core/domain/contract/usecase";
import { TaskRepository } from "../../infra/repository/task-repository";
import { ITask } from "../models/task";
import { TokenGenerator } from "../../../../core/infra/adapters/jwt-adapter";

export interface IDeleteTaskParams {
    token: string;
    id: string;
}

export class DeleteTaskUsecase implements UseCase {
    constructor(private repository: TaskRepository) {}

    async run(data: IDeleteTaskParams) {
        try {
            // verifica se o token é válido
            let decoded = TokenGenerator.verifyToken(data.token);

            // deleta a tarefa pelo id dela
            let deletedTask: ITask[] = await this.repository.delete(data.id);

            return deletedTask;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}
