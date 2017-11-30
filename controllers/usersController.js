import User from '../models/user';

/**
* creates a user and retuns a promise
*/
function createUser(req) {
    return User.find({ id: req.body.id })
        .then((result) => {
            if (result.length) {
                // already exists in DB
                if (req.body.pushToken) {
                    return User.findOneAndUpdate(
                        { id: req.body.id },
                        { username: req.body.name, pushToken: req.body.pushToken },
                        { upsert: true },
                    )
                        .then(user => Promise.resolve(user));
                }
                return Promise.resolve(result);
            }
            // create new user
            const user = new User({
                username: req.body.name,
                id: req.body.id,
                pushToken: req.body.pushToken,
            });

            return user.save((err, u) => {
                if (err) {
                    return Promise.resolve(err);
                }
                return Promise.resolve(u);
            });
        })
        .catch(err => Promise.resolve(err));
}

function getUsers(req, res) {
    User.find({}).limit(10)
        .then((results) => {
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
}

function getUser(req, res) {
    User.find({ id: req.params.userId })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}

export { createUser, getUsers, getUser };

