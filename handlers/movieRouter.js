const helper = require('./helpers.js');

// Finds and returns all movies from the MongoDB database, if it returns no results, it generates an error message
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

// Finds and returns the first N movies, where N is the number input from the user
const handleLimitMovies = (app, Movie) => {
    app.get('/api/movies/limit/:num', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.num)) {
            resp.json({ message: "Invalid input" });
            return;
        }

        // First checks to see if the number we gave is is within range, if it is not, a message is displayed
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

// Finds and returns the movie that matches the ID provided by the user
const handleSingleMovie = (app, Movie) => {
    app.get('/api/movies/:id', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.id)) {
            resp.json({ message: "Invalid input" });
            return;
        }
        // Finds movies based on movie ID, returning either the single movie or a JSON message indicating the record was not found
        Movie.find({ id: req.params.id })
            .then((data) => {
                // Checks to see if the movie exists or not
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

// Returns single movie based on a TMBD ID provided by the user
const handleMovieTMDB = (app, Movie) => {
    app.get('/api/movies/tmdb/:tmdb_id', helper.ensureAuthenticated, (req,resp) => {

        // This is a check to see if the input is a number or not, returns JSON message
        if (isNaN(req.params.tmdb_id)) {
            resp.json({ message: "Invalid input" });
            return;
        }
        // Finds movie based on movei TMDB ID, returning either the single movie or a JSON Message indicating that the record was not found
        Movie.find({ tmdb_id: req.params.tmdb_id })
            .then((data) => {
                // Checks to see if the movie exists or not
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

// Returns all movies within the year range provided by the user, or a JSON message indicating the year range was invalid
const handleMovieYear = (app, Movie) => {
    app.get('/api/movies/year/:min/:max', helper.ensureAuthenticated, (req,resp) => {
        // Convert the year into Int to compare the two values more effectively
        const minYear = parseInt(req.params.min);
        const maxYear = parseInt(req.params.max);

        // If the values provided by the user are not numbers, or out of order, a JSON message will display
        if (isNaN(minYear) || isNaN(maxYear) || maxYear < minYear) {
            resp.json({ message: "Invalid rating range" });
            return;
        }

        Movie.find({})
            .exec()
            .then((movies) => {
                const filteredMovies = movies.filter((movie) => {
                // Takes the release_date portion of the movie object and slices it so only the year is used for the comparison
                const releaseYear = parseInt(String(movie.release_date).slice(11, 15));
                // Adds any movie that release year is inbetween the provided values
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

// Returns all movies within the average rating range provided by the user, or a JSON message indicating the rating range was invalid
const handleMovieAverage = (app, Movie) => {
    app.get('/api/movies/ratings/:min/:max', helper.ensureAuthenticated, (req, resp) => {
        const minRating = req.params.min;
        const maxRating = req.params.max;

        // This is a check to see if the input is a number or not, returns JSON message, also checks to see if the numbers are in range
        // Used parseInt here to ensure that the string of the numbers was not being used in the comparison
        if (isNaN(minRating) || isNaN(maxRating) || parseInt(maxRating) < parseInt(minRating) || maxRating >= 11 || minRating <= -1) {
            resp.json({ message: "Invalid rating range" });
            return;
        }
        Movie.find()
        .where("ratings.average")
        .gt(minRating)
        .lt(maxRating)
        .exec()
        .then((data) => {
            // Checking if any results are returned, displaying a error message if 0 recordds are found
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

// Returns any movie that contains the provided string ANYWHERE in the title
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
            // Checks to see if any movies are returned, if none are, a error message is displayed
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

// Returns all movies that contain the user provided string in the genre array
const handleMovieGenre = (app, Movie) => {
    app.get('/api/movies/genre/:name', helper.ensureAuthenticated, (req, resp) => {
        const genreToFind = req.params.name;

        // Finding in an array from 
        // https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
        // Case insensitive from https://www.mongodb.com/docs/manual/reference/operator/query/regex/

        Movie.find({ 'details.genres.name': { $regex: genreToFind, $options: 'i' } })
        .then((data) => {
            // Checks to see if any results are returned, if no results are found, a message is displayed
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