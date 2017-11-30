import jwt from '../lib/jwt';
import { createUser } from '../controllers/usersController';

/**
* Creates an encoded JWT and sends it back to the client
*/
function login(req, res) {
    console.log(req.body);
    const token = jwt.encode({ id: req.body.id });

    createUser(req, res)
        .then((response) => {
            console.log('response', response);
            const user = {
                id: response[0].id,
                username: response[0].username,
                jwt: token,
            };
            res.status(200).json(user);
        });
}

export { login };

