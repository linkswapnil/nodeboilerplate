/* eslint-disable handle-callback-err */
import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const db = mongoose.createConnection('mongodb://localhost/training', {useNewUrlParser: true});
autoIncrement.initialize(db);
const {Schema} = mongoose;

const userAttributes = {
	id: {type: Number, required: true, unique: true},
	name: {type: String, required: true},
	address: {type: String},
	emailId: {type: String},
	age: {type: Number}
};

const UserSchema = new Schema(userAttributes);
UserSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'id', startAt: 100});

const userModule = {};
const UserModel = db.model('User', UserSchema);

// CREATE new User
userModule.createUser = User => {
	return new Promise((resolve, reject) => {
		const model = new UserModel(User);
		model.save(err => {
			if (err) {
				return reject(err);
			}
			return resolve(model._doc);
		});
	});
};

// READ all Users
userModule.getUsers = () => {
	return new Promise((resolve, reject) => {
		UserModel.find().exec('find', (err, users) => {
			if (err) {
				reject(err);
			} else {
				resolve(users);
			}
		});
	});
};

// UPDATE user: is the user to update
userModule.updateUser = (userId, user) => {
	const {name, emailId, address, age} = user;
	return new Promise((resolve, reject) => {
		UserModel.findOne({id: userId}, (err, document) => {
			if (document) {
				document.name = name;
				document.emailId = emailId;
				document.address = address;
				document.age = age;
				document.save((err, updatedDocument) => {
					if (err) {
						reject(err);
					} else {
						resolve(updatedDocument._doc);
					}
				});
			} else {
				reject('User not found');
			}
		});
	});
};

// DELETE User
userModule.deleteUser = userId => {
	return new Promise((resolve, reject) => {
		UserModel.findOne({id: userId}, (err, document) => {
			if (document) {
				document.remove(err => {
					if (err) {
						resolve(err);
					} else {
						resolve(document._doc);
					}
				});
			} else {
				reject('User not found');
			}
		});
	});
};

export default userModule;
