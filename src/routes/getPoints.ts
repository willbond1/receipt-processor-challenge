import { Router } from 'express';

export const getPointsRoute = Router();

getPointsRoute.get('/:id/points', (req, res) => {
    res.status(200).send('Todo');
});