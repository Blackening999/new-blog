var _ = require('underscore');

// Load app configuration
console.log(process.env.NODE_ENV);
module.exports = _.extend(
	require(__dirname + '/env/all.js'),
		require(__dirname + '/env/' + process.env.NODE_ENV + '.json') || {});