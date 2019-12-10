const express = require('express');
const path = require('path');

// Calling routes
const home = require('../routes/home');
const reminders = require('../routes/reminders');
const login = require('../routes/login');
const register = require('../routes/register');

module.exports = function (app) {

    //  Connects Express to EJS for templating engines
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    //  Setting routes
    app.use('/', home);                                 // sets / path to home.js router
    app.use('/reminders', reminders);                   // sets /bestellingen path to reminders.js router
    app.use('/login', login);                           // sets /login path to login.js router (+ wachtwoord vergeten)
    app.use('/register', register);                     // sets /register path to register.js router
    

    //  Error handling middleware for 404 pages
    app.get('*', (res, req, next) => {
        throw new Error('page not found');
    });

    //  404 redirect
    app.use((error, req, res, next) => {
        res.send(`${error.message} <button onclick='window.history.back()'>Go Back</button>`);
    });

}