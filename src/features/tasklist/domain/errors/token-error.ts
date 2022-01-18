import { DomainError } from "../../../../core/domain/errors/domain-error";

export class NotAuthorizedError extends DomainError {
    constructor() {
        super(`Não autorizado`, 401);
        this.name = "NotAuthorized";
    }
}
