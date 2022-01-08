import { ITask } from "./task-interface";

export interface IUser {
    id: string;
    name: string;
    pass: string;
    taskList: ITask[];
}
