import { NextFunction, Request, Response } from 'express';

export function serverErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).send({ error: 'Internal Server Error' });
}