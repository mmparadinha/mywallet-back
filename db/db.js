import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

export default function mongo() {
    try {
        let connection = mongoClient.db('mywallet');
        return connection;
    } catch (error) {
        console.error(error)
        return error;    
    }
}