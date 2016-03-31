/**
 * Created by Karim on 31.03.2016.
 */
var express = require('express');
var UserRouter = express.Router();

UserRouter.route('/')
    .post(function(req, res, next){
        res.end('Will add the dish: ' + req.body.username + ' with details: ' + req.body.password);
    })
;

module.exports = UserRouter;