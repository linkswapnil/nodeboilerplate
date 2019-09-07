import mongoose from 'mongoose';

const db = mongoose.createConnection('mongodb://localhost/training');
const {Schema} = mongoose;

const userAttributes = {
	id: {type: Number, required: true, unique: true},
	name: {type: String, required: true},
	address: {type: String},
	emailId: {type: String},
	age: {type: Number}
};

const UserSchema = new Schema(userAttributes);

UserSchema.pre('save', function (next) {
	const now = new Date();
	this.dateModified = now;
	if (!this.dateCreated) {
		this.dateCreated = now;
	}
	next();
});

const model = {};
const UserModel = db.model('User', UserSchema);

// CREATE new User
model.createUser = User => {
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
model.getUsers = () => {
	return new Promise((resolve, reject) => {
		UserModel.find().exec('find', (err, Users) => {
			if (err) {
				reject(err);
			} else {
				resolve(Users);
			}
		});
	});
};

export default model;
