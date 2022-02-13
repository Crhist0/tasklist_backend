import { IUser } from './user';

export interface IUserRepository {
  login(name: string): Promise<Partial<IUser>>;
  create(newUser: IUser): Promise<IUser>;
  findOneByName(name: string): Promise<IUser[]>;
}
