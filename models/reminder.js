const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    message: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    remind_date: {
        type: Date,
        required: true,
        minLength: 5,
        maxLength: 30,
        trim: true
    },
    user: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 255
    },
});

const Reminder = mongoose.model('Users', reminderSchema);

function validateReminder(reminder) {
    const schema = Joi.object({
        voornaam: Joi.string().min(2).max(30).required(),
        achternaam: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(5).max(30).trim().required(),
        wachtwoord: Joi.string().min(6).max(255).required()
    });


    return schema.validate(reminder, (error, value) => {});
}


module.exports.Reminder = Reminder;
module.exports.validate = validateReminder;
