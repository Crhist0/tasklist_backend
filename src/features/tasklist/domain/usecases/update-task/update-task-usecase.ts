import { ICacheRepository } from "./../../../../../core/domain/model/cache-repository";
import { UseCase } from "../../../../../core/domain/contract/usecase";
import { ITask } from "../../models/task";
import { TokenGenerator } from "../../../../../core/infra/adapters/jwt-adapter";
import { NotAuthorizedError } from "../../errors/token-error";
import { IUpdateTaskParams } from "./models/update-task-params";
import { TelegramBot } from "../../../../../core/infra/bots/telegram-bot";
import { ITaskRepository } from "../../models/task-repository";

export class UpdateTaskUsecase implements UseCase {
    constructor(private repository: ITaskRepository, private cacheRepository: ICacheRepository) {}

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

            // apaga o cache
            await this.cacheRepository.flush();

            // bot de telegram
            new TelegramBot().updateTaskMessage(decoded.payload.userName, newTask.description, newTask.detail);

            return updatedTask;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}
