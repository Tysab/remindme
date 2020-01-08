//  Root path is /register
const {
    create
} = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.page = {
            content: "register",
            title: "Register"
    }
    next();
});

router.get('/', async (req, res) => {
    console.log('Connected to /register');
    
    res.render('index');
});

//  Uses controller to create a new user
router.post('/', create);

module.exports = router;