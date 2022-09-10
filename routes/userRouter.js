import express from 'express';
import { registerUser, createToken } from '../controllers/userController.js';
import validateUser from '../middlewares/userSchemaValidationMIddleware.js';
import validateEmail from '../middlewares/emailValidationMiddleware.js';

const userRouter = express.Router();
userRouter.post('/user', validateUser, validateEmail, registerUser);
userRouter.get('/user', createToken);

export default userRouter;