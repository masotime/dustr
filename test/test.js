'use strict';

var chai = require('chai'),
	chaiAsPromised = require('chai-as-promised'),
	dustr = require('../index'),
	fs = require('fs');

chai.use(chaiAsPromised);
var should = chai.should();

describe('Dustr', function() {
	it('should return an object with the render function', function() {
		dustr().should.have.property('render');
	});

	describe('#render()', function() {
		it('should be able to render a simple dust template', function() {
			return dustr().render('Hello {name}, welcome to the world!', { name: 'Benjamin' })
				.should.eventually.equal('Hello Benjamin, welcome to the world!');
		});
	});
});