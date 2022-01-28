import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { User } from "../../../../core/infra/database/entities/User";
import { IUser } from "../../domain/models/user";
import { IUserRepository } from "../../domain/models/user-repository";

export class UserRepository implements IUserRepository {
    private userRepository: Repository<IUser>;

    constructor() {
        this.userRepository = DatabaseConnection.getConnection().manager.getRepository(User);
    }

    async findOneByName(name: string) {
        return await this.userRepository
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
        let newUserEntity = this.userRepository.create(newUser);

        this.userRepository
            .save(newUserEntity)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error;
            });
    }
}
