const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Index Router', () => {
	it('renders index page', done => {
		chai.request(server)
			.get('/')
			.end((_err, res) => {
				try {
					res.should.have.status(200);
					done();
				} catch (e) {
					done(e);
				}
			});
	});
});
