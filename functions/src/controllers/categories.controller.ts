import { Request, Response } from "express"
import { CategoryService } from "../services/category.service.js";
import { Category } from "../models/category.modal.js";

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Listar categorias'
        // #swagger.description = 'Rota utilizada para listar todas as categorias cadastradas.'
        /*
            #swagger.responses[200] = {
                description: 'Lista de todas as categorias',
                content: {
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Category'
                            }
                        }
                    }
                }
            }
         */
        res.send(await new CategoryService().getAll());
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Buscar categoria por ID'
        // #swagger.description = 'Rota utilizada para buscar uma categoria pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da categoria' }
        /*
            #swagger.responses[200] = {
                description: 'Dados da categoria',
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Category'
                        }
                    }
                }
            }
         */
        const categoryId = req.params.id;
        res.send(await new CategoryService().getById(categoryId as string))
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Cadastrar categoria'
        // #swagger.description = 'Rota utilizada para cadastrar uma nova categoria.'
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/addCategory"
                        }
                    }
                }
            }
        */
        await new CategoryService().save(req.body);
        res.status(201).send({
            message: `Categoria criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Alterar categoria'
        // #swagger.description = 'Rota utilizada para alterar os dados de uma categoria pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da categoria' }
        /*  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/updateCategory"
                        }
                    }
                }
            }
        */
        const categoryId = req.params.id;
        const category = req.body as Category;

        await new CategoryService().update(categoryId as string, category);

        res.send({
            message: "Categoria alterada com sucesso!"
        });
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Categories']
        // #swagger.summary = 'Excluir categoria'
        // #swagger.description = 'Rota utilizada para excluir uma categoria pelo seu ID.'
        //  #swagger.parameters['id'] = { description: 'Id da categoria' }
        const categoryId = req.params.id;
        await new CategoryService().delete(categoryId as string);
        res.status(204).end();
    }

}