/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var CommentRouter = express.Router();

CommentRouter.route('/')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function(req, res, next) {
        res.end("get");
    })
    .post(function(req, res, next) {
        res.end("post");
    })
;

module.exports = CommentRouter;

