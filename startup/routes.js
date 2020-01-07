const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Calling routes
const reminders = require('../routes/reminders');
const login = require('../routes/login');
const logout = require('../routes/logout');
const register = require('../routes/register');
const home = require('../routes/home');

module.exports = function (app) {

    //  Connects Express to EJS for templating engines
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(cookieParser());
    app.use(express.static('public'));

    //  Using global variables for routes
    app.use((req, res, next) => {
        res.locals.message = undefined;
        res.locals.page = undefined;
        res.locals.navigation = "partials/sidenav";
        // login: {
        //     content: "login",
        //     title: "Login"
        // },
        // register: {
        //     content: "register",
        //     title: "Meld je aan"
        // },
        // reminders: {
        //     content: "reminders",
        //     title: "Reminders"
        // },

        next();
    });

    //  Setting routes
    app.use('/', home); // sets /home path to home.js router
    app.use('/reminders', reminders); // sets /reminders path to reminders.js router
    app.use('/login', login); // sets /login path to login.js router
    app.use('/logout', logout); // sets /logout path to logout.js router
    app.use('/register', register); // sets /register path to register.js router

    //app.use('/profile', express.static(path.join(__dirname, '../public')));

    //  Error handling middleware for 404 pages
    app.get('*', (res, req, next) => {
        throw new Error('page not found');
    });

    //  404 redirect
    app.use((error, req, res, next) => {
        res.send(`${error.message} <button onclick='window.history.back()'>Go Back</button>`);
    });
}