import {area, circumference} from './circle';

const chai = require('chai');

describe('Circle Util', () => {
	describe('area()', () => {
		it('returns area of circle', () => {
			const radius = 10;
			const result = area(radius);
			const expectResult = 314;
			chai.expect(result).to.equal(expectResult);
		});
	});
});
