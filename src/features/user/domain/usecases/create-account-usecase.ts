import { DuplicatedUserError } from "../errors/duplicated-user";
import { UserRepository } from "../../infra/repository/user-repository";
import { UseCase } from "./../../../../core/domain/contract/usecase";
import { IUser } from "../models/user";
import { SecurePassword } from "../../infra/adapters/passCriptography";
import { GenerateUid } from "../../../../core/infra/adapters/uuidGenerator";

export interface ICreateAccountBody {
    name: string;
    pass: string;
}

export class CreateAccountUsecase implements UseCase {
    constructor(private repository: UserRepository) {}

    async run(data: ICreateAccountBody) {
        // verifica duplicidade de contas
        let arrayDeUsers = (await this.repository.findOneByName(data.name)) as IUser[];
        let user = arrayDeUsers[0];
        if (user) {
            throw new DuplicatedUserError(data.name);
        }

        let newUser: IUser = {
            id: GenerateUid.newUUID(),
            name: data.name,
            pass: SecurePassword.encrypt(data.pass),
            taskList: [],
        };

        await this.repository.create(newUser);
    }
}
