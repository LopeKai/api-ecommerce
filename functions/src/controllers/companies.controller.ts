import { Request, Response } from "express"
import { Company } from "../models/company.model.js";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Listar empresas'
        // #swagger.description = 'Rota utilizada para listar todas as empresas cadastradas.'
        res.send(await new CompanyService().getAll());
    };

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Buscar empresa por ID'
        // #swagger.description = 'Rota utilizada para buscar uma empresa pelo seu ID.'
        const companyId = req.params.id;
        res.send(await new CompanyService().getById(companyId as string))
    };

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Cadastrar empresa'
        // #swagger.description = 'Rota utilizada para cadastrar uma nova empresa.'
        await new CompanyService().save(req.body);
        res.status(201).send({
            message: `Empresa criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = 'Alterar empresa'
        // #swagger.description = 'Rota utilizada para alterar os dados de uma empresa pelo seu ID.'
        const companyId = req.params.id;
        const company = req.body as Company;

        await new CompanyService().update(companyId as string, company);

        res.send({
            message: "Empresa alterada com sucesso!"
        });
    };
}