import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Company } from "../models/company.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { UploadFileService } from "./upload-file.service.js";

export class CompanyService {

    private companyRepository: CompanyRepository; // Assim eu deixo ele global para ser usado em qualquer método da minha class
    private uploadFileService: UploadFileService

    constructor() {
        this.companyRepository = new CompanyRepository(); // aqui eu estou instanciando 
        this.uploadFileService = new UploadFileService("image/companies/");
    };

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    };

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);
        if (!company) {
            throw new NotFoundError("Empresa não encontrado!") // é indicado deixar os tratamente de error no service. inves de deixar no resposity
        };
        return company;
    };

    async save(company: Company): Promise<void> {
        const logomarcaurl = await this.uploadFileService.upload(company.logomarca);
        company.logomarca = logomarcaurl
        await this.companyRepository.save(company);
    };

    async update(id: string, company: Company): Promise<void> {
        const _company = await this.companyRepository.getById(id);

        if (!_company) {
            throw new NotFoundError("Empresa não encontrado!")
        };

        if (!this.isValidUrl(company.logomarca)) {
            _company.logomarca = await this.uploadFileService.upload(company.logomarca);
        };

        _company.cpfCnpj = company.cpfCnpj;
        _company.razaoSocial = company.razaoSocial;
        _company.nomeFantasia = company.nomeFantasia;
        _company.telefone = company.telefone;
        _company.horarioFuncionamento = company.horarioFuncionamento;
        _company.endereco = company.endereco;
        _company.localizacao = company.localizacao;
        _company.taxaEntrega = company.taxaEntrega;
        _company.ativa = company.ativa;

        await this.companyRepository.update(_company);
    };

    private isValidUrl(urlStr: string): boolean {
        try {
            const url = new URL(urlStr);
            if (url.host !== "firebasetorage.googleapis.com") {
                throw new ValidationError("URL de origem inválida!")
            };
            return true;
        } catch (error) {
            if(error instanceof ValidationError) {
                throw error;
            }
            return false;
        }
    };
}
