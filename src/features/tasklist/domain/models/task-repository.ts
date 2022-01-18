import { ITask } from "./task";

export interface ITaskRepository {
    readAllOfId(uid: string): Promise<ITask[]>;
    create(newTask: ITask): Promise<any>;
    update(uid: string, task: Partial<ITask>): Promise<any>;
    delete(uid: string): Promise<any>;
}
