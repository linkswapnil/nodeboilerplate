const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

describe('User Router', () => {
	it('returns list of users', done => {
		chai.request(server)
			.get('/users')
			.end((_err, res) => {
				try {
					res.should.have.status(200);
					res.text.should.contain('<h2>1 - User 1</h2>');
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
