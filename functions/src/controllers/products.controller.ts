import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { Product } from "../models/product.model.js";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Listar produtos'
        // #swagger.description = 'Rota utilizada para listar todos os produtos cadastrados.'
        res.send(await new ProductService().getAll());
    };

    static async search(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Pesquisar produtos por categoria'
        // #swagger.description = 'Rota utilizada para pesquisar produtos pelo ID da categoria informado na query string (categoriaId).'
        const categoriaId = req.query.categoriaId as string
        res.send(await new ProductService().search(categoriaId));
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Buscar produto por ID'
        // #swagger.description = 'Rota utilizada para buscar um produto pelo seu ID.'
        const productId = req.params.id;
        res.send(await new ProductService().getById(productId as string));
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Cadastrar produto'
        // #swagger.description = 'Rota utilizada para cadastrar um novo produto.'
        await new ProductService().save(req.body);
        res.status(201).send({
            message: 'Produto criado com sucesso!'
        })
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Alterar produto'
        // #swagger.description = 'Rota utilizada para alterar os dados de um produto pelo seu ID.'
        const productId = req.params.id;
        const produt = req.body as Product;
        await new ProductService().update(productId as string, produt);
        res.send({
            message: 'Produto alterado com sucesso!'
        })
    };

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = 'Excluir produto'
        // #swagger.description = 'Rota utilizada para excluir um produto pelo seu ID.'
        const productId = req.params.id;
        await new ProductService().delete(productId as string);
        res.status(204).end();
    };
}