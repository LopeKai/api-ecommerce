import { getAuth, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { User } from "../models/use.model";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnathorizedError } from "../errors/unauthorized.error";
import { FirebaseError } from "firebase/app";

export class AuthService {
    constructor() { }

    async create(user: User): Promise<UserRecord> {
        return getAuth()
            .createUser({
                email: user.email,
                password: user.password,
                displayName: user.nome,
            }).catch(err => {
                if (err.code === "auth/email-already-exists") {
                    throw new EmailAlreadyExistsError();
                }
                throw err;
            });
    }

    async login(email: string, password: string): Promise<UserCredential> {
        const auth = getFirebaseAuth();

        return await signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                if (err instanceof FirebaseError) {
                    console.log("entrou")
                    if (err.code === "auth/invalid-credential") {
                        throw new UnathorizedError();
                    }
                }

                throw err;
            })
    }
};