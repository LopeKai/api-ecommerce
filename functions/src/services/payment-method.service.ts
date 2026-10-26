import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payment.method.model.js";
import { PaymentMethorRepository } from "../repositories/payment-method.repository.js";

export class PaymentMethodService {
    private paymenteMethodRepository: PaymentMethorRepository;

    constructor() {
        this.paymenteMethodRepository = new PaymentMethorRepository();
    };

    async getAll(): Promise<PaymentMethod[]> {
        return this.paymenteMethodRepository.getAll();
    };

    async getBydId(id: string): Promise<PaymentMethod> {
        const paymentMethod = await this.paymenteMethodRepository.getById(id);

        if (!paymentMethod) {
            throw new NotFoundError("Forma de pagamento nao entrada!")
        };

        return paymentMethod
    };

    async save(paymentMethod: PaymentMethod) {
        await this.paymenteMethodRepository.save(paymentMethod);
    };

    async update(id: string, paymentMethod: PaymentMethod) {
        const _paymentMethod = await this.getBydId(id);

        _paymentMethod.descricao = paymentMethod.descricao;
        _paymentMethod.ativa = paymentMethod.ativa;

        await this.paymenteMethodRepository.update(_paymentMethod);
    };

    async delete(id: string) {
        await this.paymenteMethodRepository.delete(id);
    };
}