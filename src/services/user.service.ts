import { getFirestore } from "firebase-admin/firestore";
import { User } from "../models/use.model";
import { NotFoundError } from "../errors/not-found.error";

export class UserService {
    async getAll(): Promise<User[]> {
        const snapshot = await getFirestore().collection("users").get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        }) as User[];
    };

    async getById(id: string): Promise<User> {
        const doc = await getFirestore().collection("users").doc(id as string).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            return user;
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        }
    };

    async save(user: User): Promise<void> {
        await getFirestore().collection("users").add(user);
    };

    async update(id: string, user: User): Promise<void> {
        const docRef = getFirestore().collection("users").doc(id as string);

        if ((await docRef.get()).exists) {
            docRef.set({
                nome: user.nome,
                email: user.email
            });
        } else {
            throw new NotFoundError("Usuário não encontrado!")
        };
    };

    async delete(id: string): Promise<void> {
        await getFirestore().collection("users").doc(id as string).delete()
    };
}
