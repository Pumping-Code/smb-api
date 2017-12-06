import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    id: String,
    pushToken: String,
    when: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;
