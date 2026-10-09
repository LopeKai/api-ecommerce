import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { ordemItemSchema, OrderItem } from "./ordem-item.model.js";
import { PaymentMethod } from "./payment.method.model.js";

export type Order = {
    empresa: Company;
    cliente: Customer;
    endereco: Address;
    cpfCnpfCupom: string;
    data: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items: OrderItem[];
    status: OrderStatus;
};

export enum OrderStatus {
    pendente = "pendente",
    aprovado = "aprovado",
    entrega = "entrega",
    concluido = "concluido",
    cancelado = "cancelado"
};

export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: customerSchema.required(),
    endereco: Joi.alternatives().conditional(
        "isEntrega", {
        is: true, then: orderAddressSchema.required(),
        otherwise: Joi.object().only().allow(null).default(null)
    }
    ),
    cpfCnpfCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().min(1).items(ordemItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente)
});

export const searchParamsOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string().allow(...Object.values(OrderStatus))
});