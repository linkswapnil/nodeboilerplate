/* eslint-disable new-cap */
import fs from 'fs';
import express from 'express';

const users = JSON.parse(fs.readFileSync('./files/users.json'));

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
	fs.writeFileSync('./files/users.json', JSON.stringify(users));
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
	fs.writeFileSync('./files/users.json', JSON.stringify(users));
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
	fs.writeFileSync('./files/users.json', JSON.stringify(users));
	res.send(users);
});

export default router;
