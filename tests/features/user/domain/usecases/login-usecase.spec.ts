import { MockUserRepository } from '../../infra/repository/user-repository.test';
import { NotFoundError } from './../../../../../src/core/domain/errors/notfound-error';
import { LoginUseCase } from './../../../../../src/features/user/domain/usecases/login/login-usecase';
import { DatabaseConnection } from './../../../../../src/core/infra/database/connections/connection';

describe('testes unitários da feature User - login usecase', () => {
    const makeSut = () => {
        const userRepo = new MockUserRepository();
        const loginUserCase = new LoginUseCase(userRepo);
        return loginUserCase;
    };

    jest.setTimeout(30000);
    beforeAll(async () => {
        await DatabaseConnection.initConnection();
    });

    test('should return 404 when try to login', async () => {
        expect.assertions(1);
        try {
            const sut = makeSut();
            let result = await sut.run({ name: 'nome', pass: 'senha' });
        } catch (error) {
            let result = error as NotFoundError;
            expect(result.code).toEqual(404);
        }
    });
});
