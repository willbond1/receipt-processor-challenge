import { Router } from 'express';

export const processReceiptsRoute = Router();

processReceiptsRoute.post('/process', (req, res) => {
    res.status(200).send('Todo');
});