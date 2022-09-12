import mongo from "../db/db.js";
import dayjs from 'dayjs';

let db = mongo();

export async function getTransactions(req, res) {
    const { authorization, userid } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para fazer movimentações!')};

    try {
        const userTransactions = await db.collection('transactions').find({ userid }).toArray();
        res.status(200).send(userTransactions);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function postTransaction(req, res) {
    const transaction = res.locals.transaction;
    const { authorization, userid } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const loggedIn = await db.collection('sessions').findOne({ token });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para fazer movimentações!')};

    try {
        await db.collection('transactions').insertOne({
            ...transaction,
            userid,
            date: dayjs().format('DD/MM'),
        });
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}