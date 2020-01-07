//  Root path is /logout

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /logout');
    res.clearCookie('authToken');
    res.redirect('/');
});

router.post('/', async (req, res) => {

});

module.exports = router;