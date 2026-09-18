import expresss, { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '../errors/unauthorized.error';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

export const auth = (app: expresss.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split("Bearer ")[1];

        if (token) {
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token);
                console.log(decodedIdToken)
                return next();
            } catch (error) {
                next(new UnathorizedError());
            }
        };
        next(new UnathorizedError());
    });
}