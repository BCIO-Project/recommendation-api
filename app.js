const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors')

const getCacheHeaders = require('./utils/cache').getCacheHeaders
require('./config/config')
const redis = require('./repositories/redis').openConnection
redis();


const api = require('./routes/api');

let app = express();
app.use(cors()); 
//TODO: Enable it using predefined domains

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', api);
app.use('/', function(req, res, next){
    res.set(getCacheHeaders())
    res.json('ok');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
