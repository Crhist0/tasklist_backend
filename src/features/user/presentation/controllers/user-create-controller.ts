import { Controller } from "./../../../../core/presentation/contract/controller";
import { Request, Response } from "express";
import { ok, serverError } from "../../../../core/presentation/helper/http-handler";
import { CreateAccountUsecase, ICreateAccountBody } from "../../domain/usecases/create-account-usecase";

export class UserCreateController implements Controller {
    constructor(private createAccountUsecase: CreateAccountUsecase) {}

    async execute(req: Request, res: Response) {
        try {
            let newUser: ICreateAccountBody = {
                name: req.body.name,
                pass: req.body.pass,
            };

            let result = await this.createAccountUsecase.run(newUser);

            return ok(res, result);
        } catch (error) {
            return serverError(res, error);
        }
    }
}
