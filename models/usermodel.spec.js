const chai = require('chai');
const mongoose = require('mongoose');
const autoIncreament = require('mongoose-auto-increment');
const sinon = require('sinon');

const users = [{id: 1, name: 'test1'}, {id: 2, name: 'test2'}];
const updatedDocument = {
	_doc: {id: 1, name: 'updated user name'}
};
const document = {
	id: 1,
	name: 'test1',
	save: cb => {
		cb(undefined, updatedDocument);
	},
	remove: cb => {
		cb(undefined, updatedDocument);
	}
};
const model = {
	save: cb => {
		cb();
	},
	_doc: users[0]
};

const UserModel = function () {
	return model;
};

const userSchema = {
	plugin: () => {}
};
UserModel.__proto__.find = function () {
	return {
		exec: (command, cb) => {
			cb(undefined, users);
		}
	};
};
UserModel.__proto__.findOne = function (query, cb) {
	cb(undefined, document);
};
UserModel.prototype.find = function () {
	return {
		exec: cb => {
			cb(undefined, users);
		}
	};
};
const mockDb = {
	model: () => UserModel
};
sinon.stub(mongoose, 'createConnection').callsFake(() => {
	return mockDb;
});

sinon.stub(mongoose, 'Schema').callsFake(() => {
	return userSchema;
});

sinon.stub(autoIncreament, 'initialize').callsFake(() => {
	return 1;
});
const userModel = require('./usermodel');

describe('User Model', () => {
	describe('createUser()', () => {
		it('calls model save method and returns created user', done => {
			userModel.default.createUser(users[0]).then(result => {
				chai.expect(result).to.equal(users[0]);
				done();
			});
		});
	});
	describe('getUsersByName()', () => {
		it('calls model find method and returns users list', done => {
			userModel.default.getUsersByName('test1').then(result => {
				console.log('users', users);
				chai.expect(result).to.equal(users);
				done();
			});
		});
	});

	describe('getUsers()', () => {
		it('calls model find method and returns users list', done => {
			userModel.default.getUsersByName('test1').then(result => {
				console.log('users', users);
				chai.expect(result).to.equal(users);
				done();
			});
		});
	});

	describe('updateUser()', () => {
		it('return updated user object', done => {
			userModel.default.updateUser(1, updatedDocument._doc).then(result => {
				chai.expect(result.name).to.equal('updated user name');
				done();
			});
		});
	});

	describe('deleteUser()', () => {
		it('calls documents remove method and return no user', done => {
			userModel.default.deleteUser(1).then(result => {
				chai.expect(result).to.equal(undefined);
				done();
			});
		});
	});
});
