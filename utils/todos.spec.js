import sinon from 'sinon';
import todoUtil from './todos';

const chai = require('chai');
const nodeFetch = require('node-fetch');

describe('Todos', () => {
	describe('getTodos()', () => {
		const todoList = [{id: 101}];
		const responseObject = {status: '200', json: () => {
			return todoList;
		}};
		beforeEach(() => {
			sinon.stub(nodeFetch, 'Promise').returns(Promise.resolve(responseObject));
		});

		afterEach(() => {
			sinon.restore();
		});

		it('returns array of todos', async () => {
			try {
				const todos = await todoUtil.getTodos();
				console.log('todos', todos);
				chai.expect(todos[0].id).to.equal(101);
			} catch (err) {
				console.log(err);
				chai.expect(typeof err).to.equal('undefined');
			}
		});
	});
});
