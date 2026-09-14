import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation.error';
import { InternalServerError } from '../errors/internal-server.error';
import { NotFoundError } from '../errors/not-found.error';
import { errors } from 'celebrate';

export const errorHandler = (app: express.Express) => {
    app.use(errors()); // error calebrete schema

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof ValidationError) {
            error.send(res)
        } else if (error instanceof NotFoundError) {
            error.send(res)
        } else {
            new InternalServerError().send(res)
        }
    }); // quando eu estou fazendo um middlaware para capturar erro. se a funcao tem 4 paramentro, o express ja entende que se trata de um middlaware para caputar erro.
};