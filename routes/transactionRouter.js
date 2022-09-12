import express from 'express';
import { getTransactions, postTransaction, putTransaction, deleteTransaction } from '../controllers/transactionController.js';
import validateTransaction from '../middlewares/transactionSchemaValidationMiddleware.js';

const transactionRouter = express.Router();
transactionRouter.get('/transaction', getTransactions);
transactionRouter.post('/transaction', validateTransaction, postTransaction);
transactionRouter.put('/transaction', validateTransaction, putTransaction);
transactionRouter.delete('/transaction/:transactionId', deleteTransaction);

export default transactionRouter;