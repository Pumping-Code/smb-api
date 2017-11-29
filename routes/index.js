const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('ay');
    res.json({ home: true });
});

module.exports = router;
