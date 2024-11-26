import { Router } from "express";

export const homeRoute = Router();

homeRoute.get('/', (req, res) => {
    res.send('Hello from the Receipt Processing Server!');
});

