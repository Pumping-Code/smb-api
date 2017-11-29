const jwt = require('../lib/jwt.js');
const users = require('../controllers/usersController');

/**
* Creates an encoded JWT and sends it back to the client
*/
exports.login = function (req, res) {
    const token = jwt.encode({ id: req.body.id });

    users.createUser(req, res)
    .then((response) => {
        const user = {
            id: response[0].id,
            username: response[0].username,
            jwt: token,
        };
        res.status(200).json(user);
    });
};
