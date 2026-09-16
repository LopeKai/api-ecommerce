import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/use.model";

export class UserRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("users");
    };

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as User;
        }) as User[];
    };

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id as string).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as User;
            return user;
        } else {
            return null;
        }
    };

    async save(user: User) {
        await this.collection.add(user);
    };

    async update(user: User) {
        const docRef = this.collection.doc(user.id as string);

        await docRef.set({
            nome: user.nome,
            email: user.email
        });
    };

    async delete(id: string) {
        await this.collection.doc(id as string).delete()
    };
}