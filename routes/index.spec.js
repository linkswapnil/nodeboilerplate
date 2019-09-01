const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const should = chai.should();

chai.use(chaiHttp);

describe('Index Router', () => {
	it('renders index page', () => {
		chai.request(server)
			.get('/')
			.end((err, res) => {
				try {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				}catch (e) {
					done(e);
				}
			});
	});
});
