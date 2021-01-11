var createError = require('http-errors');
var express = require('express');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
const exphbs  = require('express-handlebars');
const session  = require('express-session');
const MongoStore  = require('connect-mongo')(session)
const bodyparser = require('body-parser')
const connection = require('./connection')
const passport = require('passport')

require('./controller/login')(passport);


app.use(session({
  key: '50c4e9701220156b6cb7dd653a46d28bdbfd3abc',
  secret: '49c4e9701220156b6cb7dd653a46d28bdbfd3abc',
  resave: false,
  store: new MongoStore({
    url: 'mongodb://localhost:27017/vcomply',
    touchAfter: 24 * 3600 // time period in seconds
  }),
  saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(bodyparser.urlencoded({
  extended : false
}))

let indexRouter = require('./routes/index');


app.set('trust proxy', 1); // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');




app.engine('hbs', exphbs({
  helpers: {
    "when": function (operand_1, operator, operand_2, options) {
      var operators = {
        'eq': function (l, r) {
          return l == r;
        }
      }
      , result = operators[operator](operand_1, operand_2);
      if (result) return options.fn(this);
      else return options.inverse(this);
    }
  },
 defaultLayout: 'main.hbs',
  partialsDir: __dirname + '/views/partials/'
}));


app.use(express.static(path.join(__dirname, 'assets')));
// view engine setup


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use('/', indexRouter);
//app.use('/', supportRouter);



/*app.get('*', function(req, res){
  res.render('error')
});*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(req.app.get('env'))
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//exports.app = functions.https.onRequest(app);

PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


module.exports = app;
