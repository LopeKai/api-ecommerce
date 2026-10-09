import { NotFoundError } from "../errors/not-found.error.js";
import { Order } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethorRepository } from "../repositories/payment-method.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class OrderService {
    private orderRepository: OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethorRepository: PaymentMethorRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.companyRepository = new CompanyRepository();
        this.paymentMethorRepository = new PaymentMethorRepository();
        this.paymentMethorRepository = new PaymentMethorRepository();
        this.productRepository = new ProductRepository();
    }

    async save(order: Order) {
        const company = await this.companyRepository.getById(order.empresa.id! as string);
        const paymentMethod = await this.paymentMethorRepository.getById(order.formaPagamento.id!)

        if (!company) {
            throw new NotFoundError("Empresa nao encontrada!")
        };

        order.empresa = company;

        if (!paymentMethod) {
            throw new NotFoundError("Forma de Pagamento nao encontrada!")
        };

        order.formaPagamento = paymentMethod;

        for (let item of order.items) {
            const product = await this.productRepository.getById(item.produto.id);

            if(!product) {
                throw new NotFoundError("Produto nao encontrado!")
            }

            item.produto = product;
        };

        await this.orderRepository.save(order)
    }
}