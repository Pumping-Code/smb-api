import mongoose from 'mongoose';

const { DB_INFO } = process.env;
const connection = `mongodb://${DB_INFO}`;

mongoose.Promise = global.Promise;
const db = mongoose.connect(connection, {
    useMongoClient: true,
});

export default db;
