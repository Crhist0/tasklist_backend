import { createServer } from './../../../../../src/core/presentation/server';
import { RedisConnection } from './../../../../../src/core/infra/database/connections/redis';
import { CreateUserInDB } from './../../../../helpers/user-creator';
import { UserRepository } from '../../../../../src/features/user/infra/repository/user-repository';
import { GenerateUid } from '../../../../../src/core/infra/adapters/uuidGenerator';
import { SecurePassword } from '../../../../../src/features/user/infra/adapters/passCriptography';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connections/connection';

// library of string validators and sanitizers
import validator from 'validator';

// // mocked class
// export class MockUserRepository implements IUserRepository {
//   async login(name: string): Promise<Partial<IUser>> {
//     const newUser: IUser = await CreateUserInDB();
//     const user: Partial<IUser> = {
//       id: newUser.id,
//       name: newUser.name,
//       pass: newUser.pass,
//     };
//     return user;
//   }
//   async create(user: IUser): Promise<IUser> {
//     let userP: IUser = {
//       id: GenerateUid.newUUID(),
//       name: 'data.name',
//       pass: SecurePassword.encrypt('data.pass'),
//       taskList: [],
//     };
//     return userP;
//   }
//   async findOneByName(name: string): Promise<IUser[]> {
//     return [];
//   }
// }

// repository test
describe('feature User - teste de user-repository', () => {
  let app: Express.Application;
  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    await RedisConnection.initConnection();
    app = createServer();
  });
  afterAll(async () => {
    await DatabaseConnection.closeConnection();
    await RedisConnection.closeConnection();
  });

  const makeSut = () => {
    const userRepo = new UserRepository();
    return userRepo;
  };

  test('should return the user when creating a new user', async () => {
    const sut = makeSut();
    let user = await CreateUserInDB();
    let result = await sut.create(user);
    expect(result.name).toEqual(user.name);
    expect(validator.isUUID(result.id, 4)).toEqual(true);
    expect(result.pass).not.toEqual('any_pass');
    expect(SecurePassword.compare('any_pass', result.pass)).toEqual(true);
    expect(result.taskList.length).toEqual(0);
  });

  test('should return the user when loggin in', async () => {
    const sut = makeSut();
    let user = await CreateUserInDB();
    let result = await sut.login(user.name);
    expect(result.name as string).toEqual(user.name);
    expect(validator.isUUID(result.id as string, 4)).toEqual(true);
    expect(result.pass as string).not.toEqual('any_pass');
    expect(SecurePassword.compare('any_pass', result.pass as string)).toEqual(true);
  });

  test('should return an empty array when not finding any user by user.name', async () => {
    const sut = makeSut();
    let user = await CreateUserInDB();
    const result = await sut.findOneByName(GenerateUid.newUUID());
    expect(result.length).toEqual(0);
  });

  test('should return an array with the user when finding an user by user.name', async () => {
    const sut = makeSut();
    let user = await CreateUserInDB();
    const result = await sut.findOneByName(user.name);
    expect(result.length).toEqual(1);
    let resultUser = result[0];
    expect(validator.isUUID(resultUser.id, 4)).toEqual(true);
    expect(resultUser.name).toEqual(user.name);
    expect(resultUser.pass).toEqual(user.pass);
    expect(SecurePassword.compare('any_pass', resultUser.pass)).toEqual(true);
  });
});
