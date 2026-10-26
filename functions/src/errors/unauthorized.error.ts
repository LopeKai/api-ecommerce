import { ErrorBase } from "./base.error.js";

export class UnathorizedError extends ErrorBase {
    constructor(message = "Não autorizado!") {
        super(401, message)
    }
};