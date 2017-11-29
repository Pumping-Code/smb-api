const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;

exports.encode = function (user) {
    return jwt.encode(user, secret);
};

exports.decode = function (token) {
    return jwt.decode(token, secret);
};
