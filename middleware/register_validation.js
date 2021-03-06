const joi = require("joi");
const responses = require('../modules/common_functions/responses')
const constants = require('../modules/constants/constants')

const validation = joi.object({
	userName: joi.string().alphanum().min(3).max(25).required(),
	email: joi.string().email().required(),
	password: joi.string().min(5).required(),
	mobileNumber: joi.string().length(10).required()
});

const studentValidation = async (req, res, next) => {
	const payload = {
		userName: req.body.student_name,
		email: req.body.student_email,
		password: req.body.student_password,
		mobileNumber: req.body.student_phone
	};
	const { error } = validation.validate(payload);
	if (error) {
		responses.sendResponse(res, `Error in student Data : ${error.message}`, constants.STATUS_CODES.UNAUTHORIZED)
	} else {
		next();
	}
};



module.exports = { studentValidation}