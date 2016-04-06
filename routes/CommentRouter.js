/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var CommentRouter = express.Router();
var Comment = require('../models/Comment');

CommentRouter.route('/')
    .get(function(req, res, next) {
        Comment.find({})
            .populate('author')
            .exec(function(err, comments) {
                if(err) return next(err);
                res.json(comments);
            })
        ;
    })
;

module.exports = CommentRouter;

