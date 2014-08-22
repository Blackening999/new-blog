var express = require('express'),
    path = require('path'),
    mongoStore = require('connect-mongo')(express),
    config = require('../config/config'),
    root = require('../root'),
    log = require('./log')(module);

module.exports = function(app, db) {
    app.set('showStackError', true);
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(express.favicon());
    app.use(express.static(config.root + '/builds'));
    app.use(express.static(config.root + '/.tmp'));
    app.set('views', config.root + '/views');
    app.engine('ejs', require('ejs-locals'));
    app.set('view engine', 'ejs');
    if (app.get('env') == 'development') {
        app.use(express.logger('dev'));
    } else {
        app.use(express.logger('default'));
    }
    app.use(express.json());
    app.use(express.urlencoded());
    app.configure(function() {
        app.use(express.cookieParser());
        app.use(express.session({
            secret: 'myprecious',
            store: new mongoStore({
                db: db.connection.db,
                collection: 'sessions'
            })
        }));
        app.use(app.router);
        app.use(function(err, req, res, next) {
            if (~err.message.indexOf('not found')) return next();
            console.error(err.stack);
            res.status(500).render('500', {
                error: err.stack
            });
        });
        app.use(function(req, res) {
            res.status(404).redirect('/#' + req.originalUrl);
        });
    });
};