import { map, forEach } from 'lodash';
import { sendPush } from '../services/push';
import Location from '../models/location';
import User from '../models/user';

function sendLocation(req, res) {
    if (req.body.location) {
        const { lat, lng } = req.body.location;
        const { id } = req.headers;
        Location.findOneAndUpdate({ user: id }, { location: [lng, lat], user: id }, { upsert: true })
            .then(() => {
                Location.find({
                    location: {
                        $near: [lng, lat],
                        $maxDistance: 100,
                    },
                })
                    .then((result) => {
                        // super wonky -- find all other users with push tokens
                        const userPromises = map(result, ({ user }) => User.find({ id: user })
                            .then((foundUser) => {
                                if (foundUser[0].pushToken) {
                                    return foundUser[0];
                                }
                            }));
                        Promise.all(userPromises).then((users) => {
                            // remove undefineds from the arr and then send the array to the push service
                            let sendingUser = {};
                            const recievingUsers = [];
                            forEach(users, (user) => {
                                if (user.id === id) {
                                    sendingUser = user;
                                } else {
                                    recievingUsers.push(user.pushToken);
                                }
                            });

                            // send push notifications to users
                            sendPush(recievingUsers, sendingUser);
                        });

                        res.json(result); // array of close bros
                    })
                    .catch((err) => {
                        res.status(400).json(err);
                    });
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    } else {
        res.status(400).send('Location Not Sent');
    }
}

function getLocations(req, res) {
    Location.find({}, 'location user when -_id').sort('-when').limit(10)
        .then((results) => {
            res.json(results);
        })
        .catch(err => res.status(400).json(err));
}

export { sendLocation, getLocations };
