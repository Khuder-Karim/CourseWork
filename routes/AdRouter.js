/**
 * Created by Karim on 31.03.2016.
 */

var express = require('express');
var AdRouter = express.Router();

AdRouter.route('/')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function(req, res, next) {
        res.end('Will send all the dishes to you!');
    })
    .post(function(req, res, next) {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
;

AdRouter.route('/:adId')
    .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
    })
    .get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.adId +' to you!');
    })
    .delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.adId);
    })
;

module.exports = AdRouter;
