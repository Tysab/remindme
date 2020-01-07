//  Root path is /reminders

const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log('Connected to /reminders');

    res.send('REMINDER PAGE');
});


module.exports = router;