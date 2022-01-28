import { IUser } from "./user";

export interface IUserRepository {
    login(name: string): Promise<IUser>;
    create(newUser: IUser): Promise<any>;
    findOneByName(name: string): Promise<IUser[] | any>;
}
