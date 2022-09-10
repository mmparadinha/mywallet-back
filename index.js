import cors from 'cors';
import express from 'express';
import userRouter from './routes/userRouter.js';
import transactionRouter from './routes/transactionRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(transactionRouter);

app.listen(5000, console.log('Listening at 5000!'));