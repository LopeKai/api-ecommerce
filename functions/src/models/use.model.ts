import { Joi } from "celebrate"
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class User {
    id: number | string;
    nome: string;
    email: string;
    password?: string;

    constructor(data: User | any) {
        this.id = data.i;
        this.nome = data.nom;
        this.email = data.emai;
        this.password = data.password;
    }
};

export const newUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const updateUserSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6)
});

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

export const authRecoverySchema = Joi.object().keys({
    email: Joi.string().email().required(),
});

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User): DocumentData => {
        return {
            nome: user.nome,
            email: user.email
        }
    },
    fromFirestore: function (snapshot: QueryDocumentSnapshot): User {
        return new User({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
};