import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { User } from "../../../../core/infra/database/entities/User";
import { IUser } from "../../domain/models/user";
import { IUserRepository } from "../../domain/models/user-repository";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async findOneByName(name: string) {
        return await this.repository
            .find({ name: name })
            .then((userList) => {
                return userList;
            })
            .catch((error) => {
                return error;
            });
    }

    async login(name: string) {
        return await this.findOneByName(name)
            .then((response) => {
                return response[0];
            })
            .catch((error) => {
                return error;
            });
    }

    async create(newUser: IUser) {
        let newUserEntity = this.repository.create(newUser);

        this.repository
            .save(newUserEntity)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
    }
}
