import _ from 'lodash';
import push from '../services/push';
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
                        _.remove(result, { user: id });

                        const arr = [];
                        _.forEach(result, ({ user }) => {
                            User.find({ id: user })
                                .then((foundUser) => {
                                    // console.log('foundUser', foundUser);
                                    if (foundUser[0].pushToken) {
                                        console.log('token', foundUser[0].pushToken);
                                        arr.push(foundUser[0].pushToken);
                                    }
                                });
                        });
                        push(arr);

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

