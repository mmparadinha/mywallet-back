import userSchema from '../schemas/userSchema.js';

const validateUser = async (req, res, next) => {
    const user = req.body;
    const validation = userSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    }

    res.locals.user = user;
    next();
}

export default validateUser;