import { Request, Response } from "express"
import { CategoryService } from "../services/category.service.js";
import { Category } from "../models/category.modal.js";

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.send(await new CategoryService().getAll());
    };

    static async getById(req: Request, res: Response) {
        const categoryId = req.params.id;
        res.send(await new CategoryService().getById(categoryId as string))
    };

    static async save(req: Request, res: Response) {
        await new CategoryService().save(req.body);
        res.status(201).send({
            message: `Categoria criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response) {
        const categoryId = req.params.id;
        const category = req.body as Category;

        await new CategoryService().update(categoryId as string, category);

        res.send({
            message: "Categoria alterada com sucesso!"
        });
    }

    static async delete(req: Request, res: Response) {
        const categoryId = req.params.id;
        await new CategoryService().delete(categoryId as string);
        res.status(204).end();
    }

}