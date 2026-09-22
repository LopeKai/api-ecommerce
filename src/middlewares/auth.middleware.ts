import expresss, { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '../errors/unauthorized.error';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service';
import { ForbiddenError } from '../errors/forbidden.error';

export const auth = (app: expresss.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if(req.method === "POST" && (req.url.startsWith("/auth/login")) || req.url.startsWith("/auth/recovery")) {
           return next();
        };

        const token = req.headers.authorization?.split("Bearer ")[1];

        if (token) {
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token);
                const user = await new UserService().getById(decodedIdToken.uid);

                if(!user) {
                    return next(new ForbiddenError());
                };

                req.user = user;

                return next();
            } catch (error) {
                next(new UnathorizedError());
            }
        };
        next(new UnathorizedError());
    });
}