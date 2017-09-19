const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ home: true });
});

module.exports = router;
