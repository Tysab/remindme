//  Root path is /login
const {
    jwtPrivateKey
} = require('../startup/config');
const jwt = require('jsonwebtoken');

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {
    User,
    validateInput
} = require('../models/userModel');

router.use((req, res, next) => {
    res.locals.page = {
            content: "login",
            title: "Login"
    }
    next();
});


router.get('/', async (req, res) => {
    console.log('Connected to /login');

    res.render('index');
});

router.post('/', async (req, res, next) => {
//  Move to userController
    const {
        error
    } = validateInput("login", req.body);

    if (!error) {
        console.log('User input-validation pass');
    } else if (error) {
        //console.log(error);
        return res.status(400).render("index", {
            message: error.details[0].message
        });
    }

    await User.find({
            email: req.body.email.toLowerCase()
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(400).render("index", {
                    message: "E-mail or password incorrect"
                });
            };
            console.log(user);

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if (err) return res.status(400).render("index", {
                    message: "E-mail or password incorrect"
                });

                //const token = user.generateAuthToken(); // Doesn't work as a schema method

                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
                    first_name: user[0].first_name
                    //isAdmin: true,
                }, jwtPrivateKey, {
                    expiresIn: "1h"
                });
                console.log(token);

                //  Redirects successfully logged in user to /reminders
                if (result) {
                    // res.header('x-auth-token', token);
                    // res.send(token);
                    // return;
                    
                    //  Show Login Success toast
                    return res.cookie('authToken', token, {
                        expires: new Date(Date.now() + 3600000),
                        secure: false,      //  True if using HTTPS,
                        httpOnly: true
                    }).redirect('/reminders');
                };

                // if (result) return res.status(200).header('x-auth-token', token).json({
                //     message: "Login success",
                //     token: token
                // });


                res.status(400).render("index", {
                    message: "E-mail or password incorrect"
                });

            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;