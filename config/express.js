var express = require('express');
var glob = require('glob');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var config = require('config');


module.exports = function (app) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization, access_token");
    next();
  })
    .options('*', function (req, res, next) {
      res.end();
    });
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  var routers = glob.sync(rootPath + '/app/routers/*.js');
  routers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
        .send({
          'message': err.message,
          'error': err,
          'title': 'error'
        });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
      .send({
        'message': err.message,
        'error': {},
        'title': 'error'
      });
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
      .send({
        'message': err.message,
        'error': {},
        'title': 'error'
      });
  });
};
