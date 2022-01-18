import { IUser } from "./user";

export interface IUserRepository {
    login(name: string): Promise<IUser>;
    create(newUser: IUser): Promise<any>;
}
