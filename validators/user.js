import Joi from 'joi';

const userSchema = Joi.object().keys({
	emailId: Joi.string().email(),
	name: Joi.string().alphanum().min(3).max(30).required()
});

const user = {
	body: {
		user: userSchema
	}
};

export default user;
