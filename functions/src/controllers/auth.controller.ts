import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async login(req: Request, res: Response) { //static significa que o método pertence à classe em si. sem static, precisaria instanciar
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação de usuários administradores'
        // #swagger.description = 'Rota utilizada para autenticação de usuários adminstradores usuando e-mail e senha.'
        const { email, password } = req.body;

        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true)
        res.send({
            token
        });
    };

    static async recovery(req: Request, res: Response) {
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Recuperação de senha'
        // #swagger.description = 'Rota utilizada para enviar um e-mail de recuperação de senha para o usuário.'
        const { email } = req.body;

        await new AuthService().recovery(email);

        res.end();
    };

    static async signin(req: Request, res: Response) {
        // #swagger.tags = ['Auth']
        // #swagger.summary = 'Autenticação anônima'
        // #swagger.description = 'Rota utilizada para autenticação anônima, retornando um token de acesso.'
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true);
        res.send({
            token: token
        })
    }
};