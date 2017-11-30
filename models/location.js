import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    location: { type: [Number], index: '2d' },
    user: String,
    when: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
