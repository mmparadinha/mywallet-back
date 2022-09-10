import db from "../db/db.js";
import { ObjectId } from "mongodb";

export async function getTransactions(req, res) {
    const userId = req.headers.userid;

    const registered = await db.collection('users').findOne({_id: ObjectId(userId)});
    if (registered === null) {return res.status(422).send('Por favor, faça seu registro conosco!')};

    const loggedIn = await db.collection('sessions').findOne({ userId: ObjectId(userId) });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para fazer movimentações!')};

    try {
        const transactions = await db.collection('transactions').find({ userId }).toArray();
        res.status(200).send(transactions);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function postTransaction(req, res) {
    const transaction = res.locals.transaction;
    const userId = req.headers.userid;

    const registered = await db.collection('users').findOne({_id: ObjectId(userId)});
    if (registered === null) {return res.status(422).send('Por favor, faça seu registro conosco!')};

    const loggedIn = await db.collection('sessions').findOne({ userId: ObjectId(userId) });
    if (loggedIn === null) {return res.status(422).send('Você precisa estar logado para fazer movimentações!')};

    try {
        await db.collection('transactions').insertOne(transaction);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}