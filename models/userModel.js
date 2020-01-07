const {
	jwtPrivateKey
} = require('../startup/config');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const Schema = mongoose.Schema;

// NEW REFERENCE/ID
//	_id: new mongoose.Types.ObjectId(),

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	},
	last_name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 70
	},
	full_name: {
		type: String,
		default: function () {
			return this.first_name + " " + this.last_name;
		}
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 255
	},
	reminders: [{
		type: Schema.Types.ObjectId,
		ref: 'reminder'
	}]
});

//	Doesn't work for some reason
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({
		email: user[0].email,
		userId: user[0]._id,
		//isAdmin: true,
	}, jwtPrivateKey, {
		expiresIn: "1h"
	});
	return token;
};

const userModel = mongoose.model('user', userSchema);


function validateInput(validation_type, input) {

	let schema;

	switch (validation_type) {

		case 'login':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().required(),
			});
			return schema.validate(input, (error, value) => {});
			break;

		case 'register':
			console.log(`Validation type: ${validation_type}`);
			schema = Joi.object({
				first_name: Joi.string().min(1).max(50).required(),
				last_name: Joi.string().min(1).max(70).required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(6).max(255).required(),
				password_repeat: Joi.string().min(6).max(255).valid(Joi.ref('password')).required(),
			});
			return schema.validate(input, (error, value) => {});
			break;

		default:
			console.log('ERROR: validation request type not valid');
			return "ERROR: validation request type not valid";
			break;

	}


}

module.exports.User = userModel;
module.exports.validateInput = validateInput;