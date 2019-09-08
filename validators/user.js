import Joi from 'joi';

const user = {
	body: {
		emailId: Joi.string().email(),
		name: Joi.string().alphanum().min(3).max(30).required()
	}
};

export default user;
