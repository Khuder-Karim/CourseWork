var express = require('express');
var Ad = require('../models/Ad');

module.exports = function(app) {
    app.use('/user', require('./UserRouter'));
    app.use('/', require('./AdRouter'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));

    app.use('/register', function(req, res) {
        res.render('register');
    })
};

