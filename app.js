var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('./lib/passport');

var index = require('./routes/index')
var ruanganRouter = require('./routes/ruangan');
var barangRouter = require('./routes/barang');
var petugasRouter = require('./routes/petugas');
var usersRouter = require('./routes/users');
var login = require('./routes/login')
var home = require('./routes/home');
var distibusiRouter = require('./routes/distribusi');
var kondisiRouter = require('./routes/kondisi');
var mutasiRouter = require('./routes/mutasi');
var laporan = require('./routes/laporan');
var logout = require('./routes/logout');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json())

app.use(session({
  secret : 'Buat ini jadi rahasia',
  resave : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/petugas', petugasRouter);
app.use('/ruangan', ruanganRouter);
app.use('/barang', barangRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/home', home);
app.use('/distribusi', distibusiRouter);
app.use('/kondisi', kondisiRouter);
app.use('/mutasi', mutasiRouter)
app.use('/laporan', laporan);
app.use('/', index);
app.use('/logout', logout);


app.use('/', (req, res) => {
  res.status('404').send('Page Not Found');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;