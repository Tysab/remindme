const {
    Reminder,
    validateInput
} = require('../models/reminderModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */

let passed_query;

module.exports = {

    // Registers new user
    create: async function (req, res) {

        console.log(req.body);

        const {
            error
        } = validateInput(req.body);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            return res.status(400).render("index", {
                message: error.details[0].message
            });
        }

        try {

            const reminder = new Reminder({
                title: req.body.title,
                message: req.body.message,
                date: req.body.date,
                time: req.body.time,
                user: req.userData._id
            }, (err, doc) => {
                let result = (err) ? err : doc;
                console.log(result);
            });


            //  ! Catch duplicate errors
            await reminder.save(function (err, user) {
                if (err) {
                    return res.render('index', {
                        message: 'Error when creating reminder',
                        error: err
                    });
                }
                return res.render('index', {
                    message: "Your reminder is set!"
                });
            });

        } catch (ex) {
            console.log(ex);
            return res.render('index', {
                message: ex
            });
        }
    },

    // Allows user to update their data
    update: async function (user_id, data, type) {


        const {
            error
        } = validateInput(type, data);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            passed_query = error.details[0].message;
            return passed_query;
        }


        //  Copy this switch from userModel.js

        switch (type) {

            case 'set_bio':
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        biografie: data.biografie
                    }
                }, () => {
                    console.log("Biografie aangepast");
                    passed_query = "Biografie aangepast";
                });
                return passed_query;
                break;

            case 'set_userinfo':
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        voornaam: data.voornaam,
                        achternaam: data.achternaam,
                        email: data.email
                    }
                }, () => {
                    console.log("Persoonlijke gegevens aangepast");
                    passed_query = "Persoonlijke gegevens aangepast";
                });
                return passed_query;
                break;

            case 'set_password':
                const salt = await bcrypt.genSalt(10);
                let user_password = await bcrypt.hash(data.wachtwoord, salt);
                await User.findByIdAndUpdate(user_id, {
                    $set: {
                        wachtwoord: user_password,
                    }
                }, () => {
                    console.log("Wachtwoord aangepast");
                    passed_query = "Wachtwoord aangepast";
                });
                return passed_query;
                break;

            default:
                console.log('ERROR: update request not valid');
                return "ERROR: update request not valid";
                break;

        }

    }

};