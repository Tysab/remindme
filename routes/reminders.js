//  Root path is /reminders

const {
    create,
    list,
    cancel
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

router.get('/', auth, list, async (req, res) => {
    console.log('Connected to /reminders');

    res.render('index');
});

router.post('/cancel/:id', auth, cancel);

router.post('/', auth, list, create);



module.exports = router;