import { UserRepository } from '../../../../../src/features/user/infra/repository/user-repository';
import { GenerateUid } from '../../../../../src/core/infra/adapters/uuidGenerator';
import { IUser } from '../../../../../src/features/user/domain/models/user';
import { IUserRepository } from '../../../../../src/features/user/domain/models/user-repository';
import { SecurePassword } from '../../../../../src/features/user/infra/adapters/passCriptography';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connections/connection';
import { User } from '../../../../../src/core/infra/database/entities/User';

export class MockUserRepository implements IUserRepository {
    async login(name: string): Promise<IUser> {
        // devolve um usuário
        let user: IUser = {
            id: GenerateUid.newUUID(),
            name: name,
            pass: SecurePassword.encrypt('data.pass'),
            taskList: [],
        };
        return user;
    }
    async create(user: IUser): Promise<IUser> {
        // devolve um usuário
        let userP: IUser = {
            id: GenerateUid.newUUID(),
            name: 'data.name',
            pass: SecurePassword.encrypt('data.pass'),
            taskList: [],
        };
        return userP;
    }
    async findOneByName(name: string): Promise<IUser[]> {
        return [];
    }
}

describe('testes unitários da feature User - user repository', () => {
    const makeSut = () => {
        const userRepo = new UserRepository();
        return userRepo;
    };

    jest.setTimeout(30000);
    beforeAll(async () => {
        await DatabaseConnection.initConnection();
    });

    test('should find "admin" by name', async () => {
        expect.assertions(1);
        const sut = makeSut();
        let result = await sut.findOneByName('admin');
        expect(result[0]).not.toBeUndefined();
    });

    test('should log "admin" in', async () => {
        expect.assertions(1);
        const sut = makeSut();
        let result = await sut.login('admin');
        expect(result).toBeInstanceOf(User);
    });

    test('should create an user', async () => {
        expect.assertions(1);
        const sut = makeSut();
        // cria o novo usuário
        let user: IUser = {
            // id: '00000000-0000-0000-0000-000000000000',
            id: GenerateUid.newUUID(),
            name: 'test',
            pass: SecurePassword.encrypt('test'),
            taskList: [],
        };
        let result = await sut.create(user);
        expect(result).toBeInstanceOf(User);
    });
});
