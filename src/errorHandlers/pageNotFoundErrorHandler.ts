import { Request, Response } from "express";

export function pageNotFoundHandler(req: Request, res: Response) {
    res.status(404).send('Page Not Found');
}