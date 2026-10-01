import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.modal.js";
import { CategoryRespository } from "../repositories/category.repository.js";

export class CategoryService {

    private categoryRepository: CategoryRespository;

    constructor() {
        this.categoryRepository = new CategoryRespository();
    };


    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    };

    async getById(id: string): Promise<Category> {
        const category = await this.categoryRepository.getById(id);
        if (!category) {
            throw new NotFoundError("Categoria não encontrado!") // é indicado deixar os tratamente de error no service. inves de deixar no resposity
        };
        return category;
    };

    async save(category: Category): Promise<void> {
        await this.categoryRepository.save(category);
    };

    async update(id: string, category: Category): Promise<void> {
        const _category = await this.getById(id);

        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this.categoryRepository.update(_category)
    };

    async delete(id: string) {
        await this.categoryRepository.delete(id as string)
    }
}