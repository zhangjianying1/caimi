var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var login = require('./routes/login');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/views', routes);
app.use('/controller/login', login)

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});

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



//var mysql = require('mysql');
//
//var conn = mysql.createConnection({
//    host : 'localhost',
//    port : 5888,
//    user : 'root',
//    password : '',
//    database: 'test'
//});
//conn.connect();
//
//var insertSQL = 'insert into user(name) values("conan"),("fens.me")';
//var selectSQL = 'select * from user limit 10';
//var deleteSQL = 'delete from user';
//var updateSQL = 'update user set name="conan update"  where name="conan"';
//
////delete
//conn.query(deleteSQL, function (err0, res0) {
//    if (err0) console.log(err0);
//    console.log("DELETE Return ==> ");
//    console.log(res0);
//
//    //insert
//    conn.query(insertSQL, function (err1, res1) {
//        if (err1) console.log(err1);
//        console.log("INSERT Return ==> ");
//        console.log(res1);
//
//        //query
//        conn.query(selectSQL, function (err2, rows) {
//            if (err2) console.log(err2);
//
//            console.log("SELECT ==> ");
//            for (var i in rows) {
//                console.log(rows[i]);
//            }
//
//            //update
//            conn.query(updateSQL, function (err3, res3) {
//                if (err3) console.log(err3);
//                console.log("UPDATE Return ==> ");
//                console.log(res3);
//
//                //query
//                conn.query(selectSQL, function (err4, rows2) {
//                    if (err4) console.log(err4);
//
//                    console.log("SELECT ==> ");
//                    for (var i in rows2) {
//                        console.log(rows2[i]);
//                    }
//                });
//            });
//        });
//    });
//});

console.log('Server running at http://127.0.0.1:3000/');
module.exports = app;
