import Joi from "joi";

export type Category = {
    id: string;
    descricao: string;
    ativa: boolean
}

export const newCategorySchema = Joi.object().keys({
    descricao: Joi.string().required()
})


export const updateCategorySchema = Joi.object().keys({
    descricao: Joi.string().required(),
    ativa: Joi.boolean()
})