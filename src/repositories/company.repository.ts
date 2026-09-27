import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/company.model";

export class CompanyRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("companies");
    };

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            } as Company;
        }) as Company[];
    };

    async getById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id as string).get();
        if (doc.exists) {
            const user = {
                id: doc.id,
                ...doc.data()
            } as Company;
            return user;
        } else {
            return null;
        }
    };

    async save(company: Company) {
        await this.collection.add(company);
    };

    async update(company: Company) {
        const docRef = this.collection.doc(company.id as string);
        delete company.id;
        await docRef.set(company);
    };
}