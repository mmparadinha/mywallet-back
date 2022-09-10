import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
  password_confirmation: Joi.string().min(6).max(15).required()
});

export default userSchema;