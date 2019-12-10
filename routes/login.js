//  Root path is /login

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /login');
    res.send('LOGIN PAGE');
});

router.post('/', async (req, res) => {

});

module.exports = router;