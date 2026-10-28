import { Request, Response } from "express"
import { OrderService } from "../services/order.service.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrdersController {
    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Cadastrar pedido'
        // #swagger.description = 'Rota utilizada para cadastrar um novo pedido.'
        const order = new Order(req.body);

        await new OrderService().save(order)

        res.status(201).send({
            message: "Pedido criado com sucesso!"
        });
    };

    static async changeStatus(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Alterar status do pedido'
        // #swagger.description = 'Rota utilizada para alterar o status de um pedido pelo seu ID.'
        const pedidoId = req.params.id as string;
        const status = req.body.status;

        await new OrderService().changeStatus(pedidoId, status);

        res.status(204).end();
    };

    static async search(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Pesquisar pedidos'
        // #swagger.description = 'Rota utilizada para pesquisar pedidos através de filtros informados na query string.'
        const orders = await new OrderService().search(req.query as QueryParamsOrder);
        res.send(orders);
    };

    static async getItems(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Listar itens do pedido'
        // #swagger.description = 'Rota utilizada para listar os itens de um pedido pelo seu ID.'
        const items = await new OrderService().getItems(req.params.id as string);
        res.send(items)
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = 'Buscar pedido por ID'
        // #swagger.description = 'Rota utilizada para buscar um pedido pelo seu ID.'
        res.send(await new OrderService().getById(req.params.id as string))
    }
}