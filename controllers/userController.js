import mongo from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

let db = mongo();

export async function registerUser(req, res) {
    const { name, email, password } = res.locals.user;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            await db.collection('users').insertOne({
                name,
                email,
                password: passwordHash
            })
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function createToken(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });
        const passwordCheck = bcrypt.compareSync(password, user.password);

        if (user && passwordCheck) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId: user._id,
                token
            });
            res.status(200).send({
                userId: user._id,
                token
            });
        } else {
            res.sendStatus(409);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}