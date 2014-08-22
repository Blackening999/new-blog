var path = require('path'),
	rootPath = path.normalize(__dirname + '../../..');

module.exports = {
	root: rootPath,
	port: Number(process.env.PORT || 5000),
	db: process.env.MONGOHQ_URL
};