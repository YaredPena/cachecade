const express = require('express');
const router = express.Router();

router.get('/getAllApi',  (req, res) => {
    res.send('hi');
})

module.exports = router;