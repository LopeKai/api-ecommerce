import { ErrorBase } from "./base.error.js";

export class InternalServerError extends ErrorBase {
    constructor(message = "Error Interno do Servidor") {
        super(500, message)
    };
}