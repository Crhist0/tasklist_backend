import { UseCase } from "../../../../../core/domain/contract/usecase";
import { ITask } from "../../models/task";
import { TokenGenerator } from "../../../../../core/infra/adapters/jwt-adapter";
import { NotAuthorizedError } from "../../errors/token-error";
import { IDeleteTaskParams } from "./models/delete-task-params";
import { TelegramBot } from "../../../../../core/infra/bots/telegram-bot";
import { ITaskRepository } from "../../models/task-repository";
import { ICacheRepository } from "../../../../../core/domain/model/cache-repository";

export class DeleteTaskUsecase implements UseCase {
    constructor(private repository: ITaskRepository, private cacheRepository: ICacheRepository) {}

    async run(data: IDeleteTaskParams) {
        try {
            // verifica se o token é válido
            let decoded = TokenGenerator.verifyToken(data.token);

            // deleta a tarefa pelo id dela
            let deletedTask: ITask[] = await this.repository.delete(data.id);

            // apaga o cache
            await this.cacheRepository.flush();

            // bot de telegram
            new TelegramBot().deleteTaskMessage(decoded.payload.userName);

            return deletedTask;
        } catch (error) {
            throw new NotAuthorizedError();
        }
    }
}
