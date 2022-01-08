import { Repository } from "typeorm";
import { DatabaseConnection } from "../connections/connection";
import { User } from "../entities/User";

export class UserRepository {
    repository: Repository<User>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(User);
    }
}
