//  Root path is /reminders

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


router.use((req, res, next) => {
    res.locals.page = {
            content: "reminders",
            title: "Reminders"
    }

    next();
});

router.get('/', auth, async (req, res) => {
    console.log('Connected to /reminders');
    res.locals.user = req.userData;

    console.log(res.locals.user);

    res.render('index');
});


module.exports = router;