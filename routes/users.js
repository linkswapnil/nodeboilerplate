/* eslint-disable new-cap */
import express from 'express';
import validate from 'express-validation';
import userValidator from '../validators/user';
import userModel from '../models/usermodel';

const router = express.Router();

router.get('/', async (req, res) => {
	const users = await userModel.getUsers();
	const context = {
		users
	};
	res.render('users', context);
});

router.post('/', validate(userValidator), async (req, res) => {
	const {user} = req.body;
	try {
		const newUser = await userModel.createUser(user);
		res.send(`User Created Succesfully id: ${newUser.id}`);
	} catch (err) {
		res.status(500).send(`Failed to create user ${err}`);
	}
});

router.put('/:id', async (req, res) => {
	const {user} = req.body;
	const userId = parseInt(req.params.id, 10);
	try {
		const updatedUser = await userModel.updateUser(userId, user);
		res.send(updatedUser);
	} catch (err) {
		res.status(500).send(`Failed to update user reason: ${err}`);
	}
});

router.delete('/:id', async (req, res) => {
	const userId = parseInt(req.params.id, 10);
	try {
		const updatedUser = await userModel.deleteUser(userId);
		res.send(updatedUser);
	} catch (err) {
		res.status(500).send(`Failed to delete user reason: ${err}`);
	}
});

export default router;