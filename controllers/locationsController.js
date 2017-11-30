import _ from 'lodash';
import { sendPush } from '../services/push';
import Location from '../models/location';
import User from '../models/user';

function sendLocation(req, res) {
    if (req.body.location && req.headers.id) {
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
                        _.remove(result, { user: id }); // remove ourselves

                        // super wonky -- find all other users with push tokens
                        const tokens = _.map(result, ({ user }) => User.find({ id: user })
                            .then((foundUser) => {
                                if (foundUser[0].pushToken) {
                                    return foundUser[0].pushToken;
                                }
                            }));
                        Promise.all(tokens).then((vals) => {
                            // remove undefineds from the arr and then send the array to the push service
                            vals = _.compact(vals);
                            sendPush(vals);
                        });

                        res.json(result); // array of close bros
                    })
                    .catch((err) => {
                        console.log('error', err);
                    });
            })
            .catch((err) => {
                console.log('error', err);
            });
    } else {
        res.json({ error: 'location and/or fbid not sent' });
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

