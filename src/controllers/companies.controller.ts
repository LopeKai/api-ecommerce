import { Request, Response, NextFunction } from "express"
import { Company } from "../models/company.model";
import { CompanyService } from "../services/company.service";

export class CompaniesController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new CompanyService().getAll());
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        const companyId = req.params.id;
        res.send(await new CompanyService().getById(companyId as string))
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        await new CompanyService().save(req.body);
        res.status(201).send({
            message: `Empresa criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response, next: NextFunction) {
        const companyId = req.params.id;
        const company = req.body as Company;
 
        await new CompanyService().update(companyId as string, company);

        res.send({
            message: "Empresa alterada com sucesso!"
        });
    };
}