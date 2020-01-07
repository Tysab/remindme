//  Root path is /

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('Connected to /');

    res.redirect('/login');
});


module.exports = router;