import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRespository } from "../repositories/category.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRespository;

    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRespository();
    }

    async getAll(): Promise<Product[]> {
        return this.productRepository.getAll();
    };

    async search(categoriaId: string): Promise<Product[]> {
        return this.productRepository.search(categoriaId);
    }

    async getById(id: string): Promise<Product> {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError("Produto nao encontro")
        };

        return product
    };

    async save(product: Product) {
        const categoria = await this.getCategoriaById(product.categoria.id);

        product.categoria = categoria;

        await this.productRepository.save(product)
    }

    async update(id: string, product: Product) {
        const _product = await this.getById(id);
        const categoria = await this.getCategoriaById(product.categoria.id);

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.imagem = product.imagem;
        _product.preco = product.preco;
        _product.categoria = categoria;
        _product.ativa = product.ativa;

        await this.productRepository.update(_product)
    }

    async delete(id: string) {
        await this.productRepository.delete(id)
    }

    private async getCategoriaById(id: String) {
        const categoria = await this.categoryRepository.getById(id as string);

        if (!categoria) {
            throw new NotFoundError("Categoria nao encontrada!")
        };

        return categoria;
    }

}