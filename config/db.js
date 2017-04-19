const connection = `mongodb://${process.env.DB_INFO}`;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
exports.db = mongoose.connect(connection);
