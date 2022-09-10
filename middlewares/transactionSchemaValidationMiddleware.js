import transactionSchema from '../schemas/transactionSchema.js';

const validateTransaction = async (req, res, next) => {
    const transaction = req.body;
    const validation = transactionSchema.validate(transaction);

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    res.locals.transaction = transaction;
    next();
}

export default validateTransaction;