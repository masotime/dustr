'use strict';

var dust = require('dustjs-linkedin'),
	Q = require('q');

var Factory = function(spec) {

	spec = spec || {};

	// ignore spec for this first release
	dust.optimizers.format = function(ctx, node) { return node };

	return {
		'render': function(template, model) {
			var deferred = Q.defer();

			var temp = dust.compile(template, 'temp');
			dust.loadSource(temp);

			dust.render('temp', model, function(err, out) {
				if (err) {
					deferred.reject(err);
				} else {
					try {
						// remove pure whitespace
						out = out.replace(/(\r?\n)\s+\r?\n/g,'$1');
						deferred.resolve(out);
					} catch (err) {
						deferred.reject(err);
					};
				};
			});

			return deferred.promise;
		}
	}

};

module.exports = Factory;