import { User } from "../models/use.model.js";

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }  
}