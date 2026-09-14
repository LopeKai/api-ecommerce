import { NextFunction, Request, Response } from "express";
import { getFirestore } from 'firebase-admin/firestore';

interface User {
    id: number | string,
    nome: string,
    email: string
};

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection("users").get();
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as User;
            })
            res.send(users);
        } catch (error) {
            next(error);
        };
    };

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const doc = await getFirestore().collection("users").doc(userId as string).get();
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            res.send(user)
        } catch (error) {
            next(error);
        }
    };

    static async save(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body;
            const userSalvo = await getFirestore().collection("users").add(user);
            res.status(201).send({
                message: `Usuário ${userSalvo.id} criado com sucesso!`
            });
        } catch (error) {
            next(error);
        }
    };

    static update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const user = req.body as User;

            getFirestore().collection("users").doc(userId as string).set({
                nome: user.nome,
                email: user.email
            });

            res.send({
                message: "Usuario editado com sucesso!"
            });
        } catch (error) {
            next(error);
        }
    };

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let userId = req.params.id;
            await getFirestore().collection("users").doc(userId as string).delete()
            res.status(204).end()
        } catch (error) {
            next(error);
        }
    };
};