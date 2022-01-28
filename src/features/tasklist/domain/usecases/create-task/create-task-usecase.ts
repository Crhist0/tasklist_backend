import { ICacheRepository } from "./../../../../../core/domain/model/cache-repository";
import { TokenGenerator } from "../../../../../core/infra/adapters/jwt-adapter";
import { UseCase } from "../../../../../core/domain/contract/usecase";
import { ITask } from "../../models/task";
import { GenerateUid } from "../../../../../core/infra/adapters/uuidGenerator";
import { NotAuthorizedError } from "../../errors/token-error";
import { ICreateTaskParams } from "./models/create-task-params";
import { TelegramBot } from "../../../../../core/infra/bots/telegram-bot";
import { ITaskRepository } from "../../models/task-repository";

export class CreateTaskUsecase implements UseCase {
    constructor(private repository: ITaskRepository, private cacheRepository: ICacheRepository) {}

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

            // apaga o cache
            await this.cacheRepository.flush();

            // bot de telegram
            new TelegramBot().newTaskMessage(decoded.payload.userName, newTask.description, newTask.detail);

            return savedTask;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}
