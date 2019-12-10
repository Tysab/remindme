//  Root path is /reminders

// const page = require('../json/routes.json').page.profile;
const settings = page.settings;
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    console.log('Connected to /reminders');

    res.send('REMINDER PAGE');
});


module.exports = router;