import { getAuth, UserRecord } from "firebase-admin/auth";
import { User } from "../models/use.model";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";

export class AuthService {
    constructor() { }

    create(user: User): Promise<UserRecord> {
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
};