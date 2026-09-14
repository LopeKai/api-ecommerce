import { Joi } from "celebrate"

export interface User {
    id: number | string,
    nome: string,
    email: string
};

export const userSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required()
});