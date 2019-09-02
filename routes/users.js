/* eslint-disable new-cap */
import express from 'express';

const users = [
	{
		id: 1,
		name: 'User 1',
		emailId: 'user1@gmail.com',
		age: 29,
		Address: 'Pune'
	},
	{
		id: 2,
		name: 'User 2',
		emailId: 'user2@gmail.com',
		age: 29,
		Address: 'Pune'
	},
	{
		id: 3,
		name: 'User 3',
		emailId: 'user3@gmail.com',
		age: 29,
		Address: 'Pune'
	}
];

const router = express.Router();

router.get('/', (req, res) => {
	const context = {
		users
	};
	res.render('users', context);
});

router.post('/', (req, res, next) => {
	const {user} = req.body;
	users.push(user);
	res.send(users);
});

router.put('/:id', (req, res, next) => {
	const {user} = req.body;
	const userId = parseInt(req.params.id, 10);
	for (let i = 0; i < users.length; i++) {
		if (users[i].id === userId) {
			users[i] = user;
			users[i].id = userId;
		}
	}
	res.send(users);
});

/* Delete a user . */
router.delete('/:id', (req, res, next) => {
	const userId = parseInt(req.params.id, 10);
	let index = -1;
	for (let i = 0; i < users.length; i++) {
		if (users[i].id === userId) {
			index = i;
			break;
		}
	}
	if (index === -1) {
		res.status(404).send('User Not Found');
	} else {
		users.splice(index, 1);
	}
	res.send(users);
});

export default router;
