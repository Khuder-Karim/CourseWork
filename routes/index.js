var express = require('express');
var Ad = require('../models/Ad');

module.exports = function(app) {
    app.use('/user', require('./UserRouter'));
    app.use('/ad', require('./AdRouter'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/session', require('./session'));

    //app.get('/profile', function(req, res, next) {
    //    Ad.find({author : req.user._id}, function(err, ads) {
    //        if(err) return next(err);
    //        res.json(ads);
    //    })
    //});
};

