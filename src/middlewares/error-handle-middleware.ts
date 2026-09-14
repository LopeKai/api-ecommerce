import express, { NextFunction, Request, Response } from 'express';

export const errorHandler = (app: express.Express) => {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).send({
            message: 'Erro Interno do Servidor'
        })
    }); // quando eu estou fazendo um middlaware para capturar erro. se a funcao tem 4 paramentro, o express ja entende que se trata de um middlaware para caputar erro.
}