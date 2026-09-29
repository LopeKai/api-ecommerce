import { NotFoundError } from "../errors/not-found.error";
import { Company } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {

    private companyRepository: CompanyRepository; // Assim eu deixo ele global para ser usado em qualquer método da minha class

    constructor() {
        this.companyRepository = new CompanyRepository(); // aqui eu estou instanciando 
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
        return this.companyRepository.save(company);
    };

    async update(id: string, company: Company): Promise<void> {
        const _company = await this.companyRepository.getById(id);

        if (!_company) {
            throw new NotFoundError("Empresa não encontrado!")
        };

        _company.logomarca = company.logomarca;
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
}
