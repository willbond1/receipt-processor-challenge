import express, { Application } from 'express';

const app: Application = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express and TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});