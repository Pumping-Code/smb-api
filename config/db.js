import mongoose from 'mongoose';

const connection = `mongodb://${process.env.DB_INFO}`;

mongoose.Promise = global.Promise;
exports.db = mongoose.connect(connection, {
    useMongoClient: true,
});
