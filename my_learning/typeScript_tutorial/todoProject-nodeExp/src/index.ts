import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todo';

const app = express();

const PORT = 7230;

app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});
// middleware to handle error any other request
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
