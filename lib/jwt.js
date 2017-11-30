import jwt from 'jwt-simple';

function encode(user, secret) {
    return jwt.encode(user, secret);
}

function decode(token, secret) {
    return jwt.decode(token, secret);
}

export { encode, decode };

