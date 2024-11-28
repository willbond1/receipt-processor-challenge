import { Router } from 'express';
import { pointMap } from '../classes/pointMap';

export const getPointsRoute = Router();

getPointsRoute.get('/:id/points', (req, res) => {
    const id = req.params.id;
    if(!pointMap.hasOwnProperty(id)){
        res.status(404).json({ error: `Point value not found for id ${id}` });
        return;
    }

    res.status(200).json({ points: pointMap[id] });
});