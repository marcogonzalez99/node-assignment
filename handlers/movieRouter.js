const helper = require('./helpers.js');
const handleAllMovies = (app, Movie) => {
    app.get('/api/movies', helper.ensureAuthenticated, (req,resp) => {
        Movie.find()
        .then((data) => {
            resp.json(data);
        })
        .catch((err) => {
            resp.json({ message: 'Unable to Connect to Movies'});
        });
    });
};

const handleLimitMovies = (app, Movie) => {
    app.get('/api/movies/limit/:num', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.num)) {
            resp.json({ message: "Invalid input" });
            return;
        }

        // First checks to see if the number we gave it, is within range
        if (req.params.num >= 1 && req.params.num <= 200) {
            Movie.find()
            .limit(req.params.num)
            .then((data) => {
                resp.json(data);
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Movies"});
            });
        } else {
            resp.json({ message: "Value is out of Range"});
        }
    });
};

const handleSingleMovie = (app, Movie) => {
    app.get('/api/movies/:id', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.id)) {
            resp.json({ message: "Invalid input" });
            return;
        }

        Movie.find({ id: req.params.id })
            .then((data) => {
                if (data.length > 0) {
                    resp.json(data);
                } else {
                    resp.json({ messsage: "No Such Record Found"});
                }
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Movies"});
            });
    });
};

const handleMovieTMDB = (app, Movie) => {
    app.get('/api/movies/tmdb/:tmdb_id', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.tmdb_id)) {
            resp.json({ message: "Invalid input" });
            return;
        }
        Movie.find({ tmdb_id: req.params.tmdb_id })
            .then((data) => {
                if (data.length > 0) {
                    resp.json(data);
                } else {
                    resp.json({ message: "No Such Record Found"});
                }
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Movies"});
            });
    });
};

const handleMovieYear = (app, Movie) => {
    app.get('/api/movies/year/:min/:max', helper.ensureAuthenticated, (req,resp) => {
        const minYear = parseInt(req.params.min);
        const maxYear = parseInt(req.params.max);

        if (isNaN(minYear) || isNaN(maxYear) || maxYear < minYear || minYear < 1900 || maxYear > 2050) {
            resp.json({ message: "Invalid rating range" });
            return;
        }

        Movie.find({})
            .exec()
            .then((movies) => {
                const filteredMovies = movies.filter((movie) => {
                const releaseYear = parseInt(String(movie.release_date).slice(11, 15));
                return releaseYear >= minYear && releaseYear <= maxYear;
                });
                /*const result = filteredMovies.map((movie) => {
                return { title: movie.title };
                });*/
                resp.json(filteredMovies);
            })
            

            .catch((err) => {
                console.log(err.stack, err.name, err.message);
                resp.json({ message: 'Unable to Connect to Movies' });
            });
    });
};

const handleMovieAverage = (app, Movie) => {
    app.get('/api/movies/ratings/:min/:max', helper.ensureAuthenticated, (req, resp) => {
        const minRating = req.params.min;
        const maxRating = req.params.max;

        // This is a check to see if the input is a number or not, returns JSON message, also checks to see if the numbers are in range
        if (isNaN(minRating) || isNaN(maxRating) || maxRating < minRating || maxRating > 10 || minRating < 0) {
            resp.json({ message: "Invalid rating range" });
            return;
        }
        Movie.find()
        .where("ratings.average")
        .gt(minRating)
        .lt(maxRating)
        .exec()
        .then((data) => {
            if (data.length > 0) {
                resp.json(data);
            } else {
                resp.json({ message: "No Such Record Found"});
            }
        })
        .catch((err) => {
            resp.json({ message: "Unable to Connect to Movies"});
        }); 
    });
};

const handleMovieTitle = (app, Movie) => {
    app.get('/api/movies/title/:text', helper.ensureAuthenticated, (req, resp) => {
        const textToFind = req.params.text;
        // Case insensitive from https://www.mongodb.com/docs/manual/reference/operator/query/regex/
        const query = {
            title: {
                $regex: textToFind,
                $options: 'i'
            }
        };

        Movie.find(query)
        .then((data) => {
            if (data.length > 0) {
                resp.json(data);
            } else {
                resp.json({ message: "No Movies found with the given title"});
            }
        })
        .catch((err) => {
            resp.json({ message: "Unable to connect to movies"})
        });
    });
};

const handleMovieGenre = (app, Movie) => {
    app.get('/api/movies/genre/:name', helper.ensureAuthenticated, (req, resp) => {
        const genreToFind = req.params.name;

        // Finding in an array from 
        // https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/

        Movie.find({ 'details.genres.name': { $regex: genreToFind, $options: 'i' } })
        .then((data) => {
            if (data.length > 0) {
                resp.json(data);
            } else {
                resp.json({ message: "No Movies found with the provided genre"})
            }
        })
        .catch((err) => {
            resp.json({ message: "Unable to connect to movies"});
        });
    });
};

module.exports = {
    handleAllMovies,
    handleLimitMovies,
    handleSingleMovie,
    handleMovieTMDB,
    handleMovieYear,
    handleMovieAverage,
    handleMovieTitle,
    handleMovieGenre
}