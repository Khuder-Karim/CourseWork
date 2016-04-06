var express = require('express');

module.exports = function(app) {
    app.use('/user', require('./UserRouter'));
    app.use('/ad', require('./AdRouter'));
    app.use('/comment', require('./CommentRouter'));
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/session', require('./session'));
};

