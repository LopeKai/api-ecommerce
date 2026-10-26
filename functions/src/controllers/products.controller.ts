import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { Product } from "../models/product.model.js";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        res.send(await new ProductService().getAll());
    };

    static async search(req: Request, res: Response) {
        const categoriaId = req.query.categoriaId as string
        res.send(await new ProductService().search(categoriaId));
    };

    static async getById(req: Request, res: Response) {
        const productId = req.params.id;
        res.send(await new ProductService().getById(productId as string));
    };

    static async save(req: Request, res: Response) {
        await new ProductService().save(req.body);
        res.status(201).send({
            message: 'Produto criado com sucesso!'
        })
    };

    static async update(req: Request, res: Response) {
        const productId = req.params.id;
        const produt = req.body as Product;
        await new ProductService().update(productId as string, produt);
        res.send({
            message: 'Produto alterado com sucesso!'
        })
    };

    static async delete(req: Request, res: Response) {
        const productId = req.params.id;
        await new ProductService().delete(productId as string);
        res.status(204).end();
    };
}