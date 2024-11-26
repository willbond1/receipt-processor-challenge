// imports
import express from 'express';
import { pageNotFoundHandler, serverErrorHandler } from './errorHandlers';
import { homeRoute, processReceiptsRoute, getPointsRoute } from './routes';

// constants
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(serverErrorHandler);

// routes
app.use('/', homeRoute);
app.use('/receipts', processReceiptsRoute);
app.use('/receipts', getPointsRoute);
app.all('*', pageNotFoundHandler);

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});