import db from '../db/db.js';

const validateEmail = async (req, res, next) => {
    const email = res.locals.user.email;

    try {
        const alreadyRegistered = await db.collection('users').findOne({ email });
        if (!alreadyRegistered) {
            next();
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export default validateEmail;