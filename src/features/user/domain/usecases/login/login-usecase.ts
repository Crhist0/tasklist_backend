import { UseCase } from "../../../../../core/domain/contract/usecase";
import { UserRepository } from "../../../infra/repository/user-repository";
import { IUser } from "../../models/user";
import { NotFoundError } from "../../../../../core/domain/errors/notfound-error";
import { ControllerError } from "../../../../../core/presentation/error/controller-error";
import { SecurePassword } from "../../../infra/adapters/passCriptography";
import { TokenGenerator } from "../../../../../core/infra/adapters/jwt-adapter";
import { ILoginParams } from "./models/login-params";
import { ILoginPayload } from "./models/login-payload";
import { TelegramBot } from "../../../../../core/infra/bots/telegram-bot";

export class LoginUseCase implements UseCase {
    constructor(private repository: UserRepository) {}

    async run(data: ILoginParams) {
        let user: IUser[] = await this.repository.findOneByName(data.name);

        // verifica se existe perfil com o nome informado
        if (user[0] == undefined) {
            throw new NotFoundError(`Perfil de nome '${data.name}'`);
        }

        // verifica se a hash da senha do perfil é a mesma da hash da senha informada
        if (!SecurePassword.compare(data.pass, user[0].pass)) {
            throw new ControllerError("Senha incorreta.", 403);
        }

        // retorna o user logado
        let loggedUser: IUser = await this.repository.login(data.name);

        // gera um payload e envia no token jwt
        let userName = loggedUser.name;
        let userId = loggedUser.id;
        let payload: ILoginPayload = {
            userId,
            userName,
        };
        let token = TokenGenerator.newToken(payload);

        // bot de telegram
        new TelegramBot().sendMessage(`
        Usuário logado: '${data.name}'
Date: '${new Date()}'
        `);
        // fim bot;

        return token;
    }
}
