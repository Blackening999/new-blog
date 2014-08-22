var express = require('express'),

    fs = require('fs');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',

    config = require('./config/config'),

    db = require('./libs/mongoose');

var models_path = __dirname + '/models';

var walk = function (path) {

    fs.readdirSync(path).forEach(function (file) {

        var newPath = path + '/' + file;

        var stat = fs.statSync(newPath);

        if (stat.isFile()) {

            if (/(.*)\.(js|coffee)$/.test(file)) {

                require(newPath);

            }

        } else if (stat.isDirectory()) {

            walk(newPath);

        }

    });

};

walk(models_path);

var app = express();

require('./libs/express')(app, db);

require('./routes')(app);

var port = process.env.PORT || config.port;

app.listen(port);

console.log('Express app started on port ' + port);

exports = module.exports = app;