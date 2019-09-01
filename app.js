const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');

const app = express();

const indexRouter = require('./routes');

// View engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
	defaultLayout: 'layout',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views'),
	partialsDir: path.join(__dirname, 'views/partials')
}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res) => {
	const {url} = req;
	console.warn('url: ' + url);
	res.locals.metaTags = {title: 'Page not found'};
	res.render('404');
});

// Error handler
app.use((err, req, res) => {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// Render the error page
	res.status(err.status || 500);
	res.locals.metaTags = {title: 'Unable to proceed'};
	res.render('error');
});

module.exports = app;
