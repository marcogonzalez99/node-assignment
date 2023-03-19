const handleAllMovies = (app, Movie) => {
    app.get('/api/movies', (req,resp) => {
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

};

const handleSingleMovie = (app, Movie) => {
    console.log("Hello");
    app.get('/api/movies/:id', (req,resp) => {
        Movie.find({ id: req.params.id })
            .then((data) => {
                resp.json(data);
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Books"});
            });
    });
};

const handleMovieTMDB = (app, Movie) => {
    app.get('/api/movies/tmdb/:tmdb_id', (req,resp) => {
        Movie.find({ tmdb_id: req.params.tmdb_id })
            .then((data) => {
                resp.json(data);
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Books"});
            });
    });
};

const handleMovieYear = (app, Movie) => {
    console.log("Calling this from the link");
    app.get('/api/movies/year/:min/:max', (req,resp) => {
        Movie.find()
            .where("release_date")
            .gt(req.params.min)
            .lt(req.params.max)
            .sort({title:1})
            .select("title runtime")
            .exec()
            .then((data) => {
                resp.json(data);
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Books"});
            })
    });
};

const handleMovieAverage = (app, Movie) => {

};

const handleMovieTitle = (app, Movie) => {

};

const handleMovieGenre = (app, Movie) => {

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