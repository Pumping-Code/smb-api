import { encode } from '../config/jwt';
import { createUser } from '../controllers/usersController';

/**
* Creates an encoded JWT and sends it back to the client
*/
function login(req, res) {
    const token = encode({ id: req.body.id }, process.env.JWT_SECRET);

    createUser(req, res)
        .then((response) => {
            const user = {
                id: response.id,
                username: response.username,
                jwt: token,
            };
            res.status(200).json(user);
        });
}

export { login };

