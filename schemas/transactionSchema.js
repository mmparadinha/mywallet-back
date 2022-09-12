import Joi from 'joi';

const transactionSchema = Joi.object({
  value: Joi.number().positive().precision(2).required(),
  description: Joi.string().required(),
  type: Joi.valid('expense', 'income'),
  _id: Joi.any()
});

export default transactionSchema;