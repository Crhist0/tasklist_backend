import jwt, { JwtPayload } from "jsonwebtoken";
import { IPayload } from "../../../features/user/domain/usecases/login-usecase";

export class TokenGenerator {
    static newToken(payload: IPayload): string {
        return jwt.sign({ payload: payload }, process.env.SCRT as string, { expiresIn: "1h" });
    }

    static verifyToken(token: string): JwtPayload {
        return jwt.verify(token, process.env.SCRT as string) as JwtPayload;
    }
}
