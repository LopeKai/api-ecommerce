import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class PaymentMethod {
    id: string;
    descricao: string;
    ativa: boolean;

    constructor(data: PaymentMethod | any) {
        this.id = data.id;
        this.descricao = data.descricao;
        this.ativa = data.ativa;
    }
};

export const newPaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().only().allow(true).default(true)
});

export const upadatePaymentMethodSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa: Joi.boolean().required()
});

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
    toFirestore: (payment: PaymentMethod): DocumentData => {
        return {
            descricao: payment.descricao,
            ativa: payment.ativa
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): PaymentMethod => {
        return new PaymentMethod({
            id: snapshot.id,
            ...snapshot.data()
        });
    }
}




