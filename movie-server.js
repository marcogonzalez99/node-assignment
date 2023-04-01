require('dotenv').config();
const path = require('path');
const express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const passport = require('passport');
const helper = require('./handlers/helpers.js');
require('./handlers/dataConnector.js').connect();

// Creating the Express app
const app = express();

const Movie = require('./models/Movie');

// Tell Node to use JSON and HTTP Header features in body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/images'));

// For the Express Sessions
app.use(cookieParser('oreos'));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

// Passport Initializer and Session
app.use(passport.initialize());
app.use(passport.session());

// use express flash, which will be used for passing messages
app.use(flash());

// set up the passport authentication
require('./handlers/auth.js');

// User the route handlers
const movieRouter = require('./handlers/movieRouter.js');

// Routers
movieRouter.handleAllMovies(app, Movie);
movieRouter.handleLimitMovies(app, Movie);
movieRouter.handleMovieAverage(app, Movie);
movieRouter.handleMovieGenre(app, Movie);
movieRouter.handleMovieTMDB(app, Movie);
movieRouter.handleMovieTitle(app, Movie);
movieRouter.handleMovieYear(app, Movie);
movieRouter.handleSingleMovie(app, Movie);

// Engine
app.set('views', './views');
app.set('view engine', 'ejs');


// Rendering a home page
app.get('/', helper.ensureAuthenticated, (req, res) => {
    res.render('home.ejs', { user: req.user });
});


app.get('/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('error') });
});
app.post('/login', async (req, resp, next) => {
    // use passport authentication to see if valid login
    passport.authenticate('localLogin',
        {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, resp, next);
});

app.get('/logout', (req, resp) => {
    req.logout((err) => {
        if (err) {
            resp.render('login.ejs' , { message: "Something went wrong"});
        }});
    req.flash('info', 'You were logged out');
    resp.render('home.ejs', { message: req.flash('info') });
});

const port = process.env.port;
app.listen(port, () => {
    console.log("Server Running at port: " + port);
});