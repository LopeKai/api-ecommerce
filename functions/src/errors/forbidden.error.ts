import { ErrorBase } from "./base.error.js";

export class ForbiddenError extends ErrorBase {
    constructor(message = "Não authorizado!") {
        super(403, message)
    }
};