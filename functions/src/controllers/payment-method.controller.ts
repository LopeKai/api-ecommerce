import { Request, Response } from "express";
import { PaymentMethodService } from "../services/payment-method.service.js";
import { PaymentMethod } from "../models/payment.method.model.js";

export class PaymentMethodControler {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = 'Listar formas de pagamento'
        // #swagger.description = 'Rota utilizada para listar todas as formas de pagamento cadastradas.'
        /*
            #swagger.responses[200] = {
                description: 'Lista de todas as formas de pagamento',
                content: {
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/PaymentMethod'
                            }
                        }
                    }
                }
            }
         */
        res.send(await new PaymentMethodService().getAll())
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = 'Buscar forma de pagamento por ID'
        // #swagger.description = 'Rota utilizada para buscar uma forma de pagamento pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da forma de pagamento' }
        /*
            #swagger.responses[200] = {
                description: 'Dados da forma de pagamento',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/PaymentMethod'
                        }
                    }
                }
            }
         */
        const paymentMethodId = req.params.id;
        res.send(await new PaymentMethodService().getBydId(paymentMethodId as string));
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = 'Cadastrar forma de pagamento'
        // #swagger.description = 'Rota utilizada para cadastrar uma nova forma de pagamento.'
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addPaymentMethod"
                        }
                    }
                }
            }
        */
        await new PaymentMethodService().save(req.body);
        res.status(201).send({
            message: "Forma de pagamento criado com sucesso"
        })
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = 'Alterar forma de pagamento'
        // #swagger.description = 'Rota utilizada para alterar os dados de uma forma de pagamento pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da forma de pagamento' }
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updatePaymentMethod"
                        }
                    }
                }
            }
        */
        const paymentMethodId = req.params.id as string;
        const paymentMethod = req.body as PaymentMethod;

        await new PaymentMethodService().update(paymentMethodId, paymentMethod);
        res.send({
            message: "Forma de pagamento alterado com sucesso!"
        })
    };

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = 'Excluir forma de pagamento'
        // #swagger.description = 'Rota utilizada para excluir uma forma de pagamento pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da forma de pagamento' }
        const paymentMethodId = req.params.id as string;
        await new PaymentMethodService().delete(paymentMethodId);
        res.status(204).end();
    };
}