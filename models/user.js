const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    voornaam: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    achternaam: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 30,
        trim: true
    },
    wachtwoord: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255
    },
});

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        voornaam: Joi.string().min(2).max(30).required(),
        achternaam: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(5).max(30).trim().required(),
        wachtwoord: Joi.string().min(6).max(255).required()
    });


    return schema.validate(user, (error, value) => {});
}


module.exports.User = User;
module.exports.validate = validateUser;
