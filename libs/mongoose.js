var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.db, config.db_options);

module.exports = mongoose;