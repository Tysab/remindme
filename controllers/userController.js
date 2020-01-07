const {
    User,
    validateInput
} = require('../models/userModel.js');
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

        const {
            error
        } = validateInput("register", req.body);

        if (!error) {
            console.log('User input-validation pass');
        } else if (error) {
            //console.log(error);
            return res.status(400).render("register", {
                message: error.details[0].message
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        let user_password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email.toLowerCase(),
            password: user_password
        });


        //  ! Catch duplicate errors
        await user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            res.message = "Your account is created!";
            return res.redirect('/login');
        });
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