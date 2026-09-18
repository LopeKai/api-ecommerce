import { ErrorBase } from "./base.error";

export class UnathorizedError extends ErrorBase {
    constructor(message = "Não autorizado!") {
        super(401, message)
    }
};