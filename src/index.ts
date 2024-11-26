// imports
import express from 'express';
import { serverErrorHandler, pageNotFoundHandler } from './errorHandlers';

// constants
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(serverErrorHandler);

// routes
app.get('/', (req, res) => {
  res.send('Hello from the Receipt Processing Server!');
});

app.all('*', pageNotFoundHandler);

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});