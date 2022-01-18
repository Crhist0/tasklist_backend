import { Request, Response, NextFunction } from "express";
import { ControllerError } from "../../../../core/presentation/error/controller-error";

// middlewares para as rotas

class TaskMiddlewares {
    static VerifyFields = (req: Request, res: Response, next: NextFunction) => {
        let description = req.body.description as string;
        let detail = req.body.detail as string;

        if (!description && !detail) {
            throw new ControllerError("Insira uma descrição e um detalhamento.", 403);
        } else if (!description) {
            throw new ControllerError("Insira uma descrição.", 403);
        } else if (!detail) {
            throw new ControllerError("Insira um detalhamento.", 403);
        }
        next();
    };

    static VerifyMaxLenght = (req: Request, res: Response, next: NextFunction) => {
        let description = req.body.description as string;
        let detail = req.body.detail as string;

        if (Array.from(description).length > 50) {
            throw new ControllerError(`A descrição não pode exceder 50 caracteres. Sua descrição possui ${Array.from(description).length} caracteres.`, 403);
        }
        if (Array.from(detail).length > 500) {
            throw new ControllerError(`O detalhamento não pode exceder 500 caracteres. Seu detalhamento possui ${Array.from(detail).length} caracteres.`, 403);
        }

        next();
    };
}

export let createTaskMids = [
    //
    TaskMiddlewares.VerifyFields,
    TaskMiddlewares.VerifyMaxLenght,
];

export let editTaskMids = [
    //
    TaskMiddlewares.VerifyFields,
    TaskMiddlewares.VerifyMaxLenght,
];
