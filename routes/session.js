/**
 * Created by Karim on 06.04.2016.
 */

var express = require('express');
var SessionRouter = express.Router();

SessionRouter.route('/')
    .get(function(req, res, next) {
        var session = {
            username: req.user.username,
            email: req.user.email,
            numberPhone: req.user.numberPhone
        };
        res.json(session);
    })
;

module.exports = SessionRouter;
