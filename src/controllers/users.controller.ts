import { Request, Response } from "express";
import { getFirestore } from 'firebase-admin/firestore';

interface User {
    id: number | string,
    nome: string,
    email: string
};

export class UsersController {
    static async getAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        })
        res.send(users);
    };

    static async getById(req: Request, res: Response) {
        const userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId as string).get();
        const user = {
            id: doc.id,
            ...doc.data()
        } as User;
        res.send(user)
    };

    static async save(req: Request, res: Response) {
        const user = req.body;
        const userSalvo = await getFirestore().collection("users").add(user);
        res.send({
            message: `Usuário ${userSalvo.id} criado com sucesso!`
        });
    };

    static update(req: Request, res: Response) {
        const userId = req.params.id;
        const user = req.body as User;

        getFirestore().collection("users").doc(userId as string).set({
            nome: user.nome,
            email: user.email
        });

        res.send({
            message: "Usuario editado com sucesso!"
        });
    };

    static async delete(req: Request, res: Response) {
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId as string).delete()
        res.send("Deletado com sucesso")
    };
};