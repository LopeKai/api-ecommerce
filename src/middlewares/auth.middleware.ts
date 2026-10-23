import expresss, { NextFunction, Request, Response } from 'express';
import { UnathorizedError } from '../errors/unauthorized.error.js';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service.js';
import { ForbiddenError } from '../errors/forbidden.error.js';
import { NotFoundError } from '../errors/not-found.error.js';

export const auth = (app: expresss.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (isRouteUnAuthenticated(req)) {
            return next();
        };

        const token = req.headers.authorization?.split("Bearer ")[1];

        if (token) {
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token);

                if (decodedIdToken.firebase.sign_in_provider === "anonymous") {
                    return next();
                }

                req.user = await new UserService().getById(decodedIdToken.uid);;

                return next();
            } catch (error) {
                if (error instanceof NotFoundError) {
                    return next(new ForbiddenError());
                } else {
                    return next(new UnathorizedError());
                }
            }
        };
        next(new UnathorizedError());
    });

    const isRouteUnAuthenticated = (req: Request): boolean => {
        if (req.method === 'POST') {
            if (req.url.startsWith("/auth/login") ||
                req.url.startsWith("/auth/recovery") ||
                req.url.startsWith("/auth/signin")) {
                return true
            }
        }

        return false;
    }


}