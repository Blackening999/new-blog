var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    HttpError = require('error').HttpError;


exports.render = function(req, res) {
    res.render('index');
};
