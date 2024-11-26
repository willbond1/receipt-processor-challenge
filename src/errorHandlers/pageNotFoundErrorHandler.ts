import { Request, Response } from "express";

function pageNotFoundHandler(req: Request, res: Response) {
    res.status(404).send('Page Not Found');
}

export { pageNotFoundHandler };