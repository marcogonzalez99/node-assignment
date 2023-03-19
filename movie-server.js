require('dotenv').config();

const express = require('express');
const app = express();

const Movie = require('./models/Movie');

// Tell Node to use JSON and HTTP Header features in body-parser
app.use(express.urlencoded({extended: true}));

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

// Create connection to the database
require('./handlers/dataConnector.js').connect();

const port = process.env.port;
app.listen(port, () => {
    console.log("Server Running at port: "+port);
});