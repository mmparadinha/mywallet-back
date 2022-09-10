import express from 'express';
import { registerUser, validateToken } from '../controllers/userController.js';
import validateUser from '../middlewares/userSchemaValidationMIddleware.js';

const userRouter = express.Router();
userRouter.post('/user', validateUser, registerUser);
userRouter.get('/user', validateToken);

export default userRouter;