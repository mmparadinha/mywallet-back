import express from 'express';
import { getTransactions, postTransaction } from '../controllers/transactionController.js';
import validateTransaction from '../middlewares/transactionSchemaValidationMiddleware.js';

const transactionRouter = express.Router();
transactionRouter.get('/transactions', getTransactions);
transactionRouter.post('/transactions', validateTransaction, postTransaction);

export default transactionRouter;