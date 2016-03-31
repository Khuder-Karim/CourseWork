var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('./libs/mongoose');
var session = require('express-session');
var User = require('models/User').User;
var Seller = require('models/User').Seller;
var Ad = require('models/Ad');
var Comment = require('models/Comment');
var async = require('async');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var CommentRouter = require('./routes/CommentRouter');
var AdRouter = require('./routes/AdRouter');
var UserRouter = require('./routes/UserRouter');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    ttl: 24 * 60 * 60, // 1 day
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('middleware/loadUser'));

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public/css/sass'),
    dest: path.join(__dirname, 'public/css'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', UserRouter);
app.use('/ad', AdRouter);
app.use('/comment', CommentRouter);

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(config.get('port'), function() {
    console.log("Listen port: ", config.get('port'));
    //User.registration("samir", "sony", function(err, user) {
    //    if(err) console.log(err);
    //    console.log(user);
    //});
    //async.waterfall([
    //    function(callback) {
    //        User.findOne({username: "samir"}, callback);
    //    },
    //    function(user, callback) {
    //        var ad = new Ad({header: "First ad", author: user._id, price: 500});
    //        var comment = new Comment({text: "Very good", author: user._id, ad: ad._id});
    //        comment.save(function(err, comment) {
    //            if(err) {
    //                callback(err);
    //            }
    //            else {
    //                ad.comments.push(comment._id);
    //                ad.save(function (err, ad) {
    //                    if (err) {
    //                        callback(err);
    //                    }
    //                    else {
    //                        user.comments.push(comment._id);
    //                        user.save(function (err, user) {
    //                            if (err) callback(err);
    //                            else callback(null, user);
    //                        })
    //                    }
    //
    //                });
    //            }
    //        });
    //    }
    //], function(err, user) {
    //    if(err) console.log("Error");
    //    console.log(user);
    //});




    //Seller.registration("karimggg", "sony", "Karim", "Khuder", "karim5@tasd.ru", "+2656546354", function(err, user) {
    //    if(err) console.log(err);
    //});
    //Seller.authorize("karimggg", "sony", function(err, user) {
    //    if(err) console.log(err);
    //    console.log(user);
    //});
});
