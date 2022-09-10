import express from 'express';
import { registerUser, validateToken } from '../controllers/userController.js';
import validateUser from '../middlewares/userSchemaValidationMIddleware.js';
import validateEmail from '../middlewares/emailValidationMiddleware.js';

const userRouter = express.Router();
userRouter.post('/user', validateUser, validateEmail, registerUser);
userRouter.get('/user', validateToken);

export default userRouter;