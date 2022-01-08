import { Repository } from "typeorm";
import { DatabaseConnection } from "../connections/connection";
import { Task } from "../entities/Task";

export class TaskRepository {
    repository: Repository<Task>;

    constructor() {
        this.repository = DatabaseConnection.getConnection().manager.getRepository(Task);
    }
}
