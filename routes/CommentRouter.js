/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var CommentRouter = express.Router();
var Comment = require('../models/Comment');
var Ad = require('../models/Ad');

CommentRouter.route('/')
    .get(function(req, res, next) {
        Comment.find({})
            .populate({path: 'author', select: 'username'})
            .exec(function(err, comments) {
                if(err) return next(err);
                res.json(comments);
            })
        ;
    })
;

module.exports = CommentRouter;

