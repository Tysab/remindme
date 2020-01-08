//  Root path is /reminders

const {
    create
} = require('../controllers/reminderController');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.use((req, res, next) => {
    res.locals.page = {
            content: "reminders",
            title: "Reminders"
    }

    next();
});

router.get('/', auth, async (req, res) => {
    console.log('Connected to /reminders');

    res.render('index');
});

router.post('/', auth, create, async (req, res) => {
    console.log('Connected to /reminders [POST]');

    res.render('index');
});


module.exports = router;