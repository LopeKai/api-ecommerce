import { Joi } from "celebrate";

export type PaymentMethod = {
    id: string;
    descricao: string;
    ativa: boolean;
}

export const newPaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().only().allow(true).default(true)
});

export const upadatePaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().required()
});


