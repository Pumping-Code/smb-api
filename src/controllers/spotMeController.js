function spotABro(req, res) {
    // 1. POST payload should include id of requesting bro
    // 2. Find the requesting bro in database
    // 3. Send the requesting bro a push with the spotter's id
    // 4. Clicking that notification will show the spotter's profile
    // 5. Show the spotter the requester's profile
    res.json({ spot: true });
}

export { spotABro };

