import { NextFunction, Request, Response } from "express";
import { getFirestore } from 'firebase-admin/firestore';
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/use.model";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        })
        res.send(users);
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId as string).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            res.send(user);
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        }
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        const user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user);
        res.status(201).send({
            message: `Usuário ${userSalvo.id} criado com sucesso!`
        });
    };

    static async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        const user = req.body as User;
        const docRef = getFirestore().collection("users").doc(userId as string);

        if ((await docRef.get()).exists) {
            docRef.set({
                nome: user.nome,
                email: user.email
            });
            res.send({
                message: "Usuario editado com sucesso!"
            });
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        };
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId as string).delete()
        res.status(204).end()
    };
};