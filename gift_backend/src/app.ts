import cors from 'cors';
import cookieParser from "cookie-parser"
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();


//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors());
//application routes

app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  res.send('Dont worry! Server is running');
};

app.get('/', getAController);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
