const {
	jwtPrivateKey
} = require('../startup/config');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

// NEW REFERENCE/ID
//	_id: new mongoose.Types.ObjectId(),

const reminderSchema = new Schema({
	title: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 30
	},
	message: {
		type: String,
		required: true,
		minLength: 1,
	},
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	remind_date: {
		type: String,
		default: function() {
			return new Date(`${this.date} ${this.time}`);
		}
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
});

const reminderModel = mongoose.model('reminder', reminderSchema);


function validateInput(input) {

	let schema = Joi.object({
		title: Joi.string().min(2).max(30).required(),
		message: Joi.string().min(2).required(),
		date: Joi.date().required(),
		time: Joi.string().required()
	});

	return schema.validate(input, (error, value) => {});


}

module.exports.Reminder = reminderModel;
module.exports.validateInput = validateInput;