import { Request, Response } from "express";
import { User } from "../models/use.model.js";
import { UserService } from "../services/user.service.js";

export class UsersController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Listar usuários'
        // #swagger.description = 'Rota utilizada para listar todos os usuários cadastrados.'
        res.send(await new UserService().getAll());
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Buscar usuário por ID'
        // #swagger.description = 'Rota utilizada para buscar um usuário pelo seu ID.'
        const userId = req.params.id;
        res.send(await new UserService().getById(userId as string))
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Cadastrar usuário'
        // #swagger.description = 'Rota utilizada para cadastrar um novo usuário.'
        await new UserService().save(req.body);
        res.status(201).send({
            message: `Usuário criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Alterar usuário'
        // #swagger.description = 'Rota utilizada para alterar os dados de um usuário pelo seu ID.'
        const userId = req.params.id;
        const user = req.body as User;

        await new UserService().update(userId as string, user);

        res.send({
            message: "Usuario editado com sucesso!"
        });

    };

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = 'Excluir usuário'
        // #swagger.description = 'Rota utilizada para excluir um usuário pelo seu ID.'
        const userId = req.params.id;
        await new UserService().delete(userId as string);
        res.status(204).end()
    };
};