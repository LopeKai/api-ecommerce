import { Joi } from "celebrate";
import { Category } from "./category.modal.js";

export type Product = {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean;
};

export const newProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.string().only().allow(true).default(true)
});

export const updateProductSchema = Joi.object().keys({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().default(null),
    categoria: Joi.object().keys({
        id: Joi.string().required()
    }).required(),
    ativa: Joi.string().only().allow(true).default(true)
});

