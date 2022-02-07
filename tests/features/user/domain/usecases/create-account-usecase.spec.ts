import { MockUserRepository } from '../../infra/repository/user-repository.test';
import { CreateAccountUsecase } from './../../../../../src/features/user/domain/usecases/create-account/create-account-usecase';
import { DatabaseConnection } from './../../../../../src/core/infra/database/connections/connection';

describe('testes unitários da feature User - create account usecase', () => {
    const makeSut = () => {
        const userRepo = new MockUserRepository();
        const createAccountUserCase = new CreateAccountUsecase(userRepo);
        return createAccountUserCase;
    };

    jest.setTimeout(30000);
    beforeAll(async () => {
        await DatabaseConnection.initConnection();
    });

    test('create a user', async () => {
        expect.assertions(1);
        const sut = makeSut();
        let result = await sut.run({ name: 'nome', pass: 'senha' });
        expect(result).not.toBeUndefined();
    });
});
