import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/use.model.js";

export class UserRepository {
    private collection: CollectionReference<User>;

    constructor() {
        this.collection = getFirestore().collection("users").withConverter(userConverter);
    };

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => doc.data());
    };

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id as string).get();
        return doc.data() ?? null;
    };

    async save(user: User) {
        await this.collection.add(user);
    };

    async update(user: User) {
        await this.collection.doc(user.id as string).set(user)
    };

    async delete(id: string) {
        await this.collection.doc(id as string).delete()
    };
}