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
	remind_date: {
		type: Date,
		required: true,
		trim: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
});

const reminderModel = mongoose.model('reminder', reminderSchema);


function validateInput(validation_type, input) {

	let schema;

	switch (validation_type) {


		schema = Joi.object({
			title: Joi.string().min(2).max(30).required(),
			message: Joi.string().min(2).required(),
			remind_date: Joi.date().required()
		});

		//	Create
		//	Update
		//	Delete
		case '':
		break;

	
		return schema.validate(input, (error, value) => {});

		default:
			console.log('ERROR: validation request type not valid');
			return "ERROR: validation request type not valid";
			break;

	}


}

module.exports.User = reminderModel;
module.exports.validateInput = validateInput;