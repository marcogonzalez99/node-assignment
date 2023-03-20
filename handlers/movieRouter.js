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
    app.get('/api/movies/limit/:num', (req,resp) => {
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
    app.get('/api/movies/:id', (req,resp) => {
        Movie.find({ id: req.params.id })
            .then((data) => {
                if (data) {
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
    app.get('/api/movies/tmdb/:tmdb_id', (req,resp) => {
        Movie.find({ tmdb_id: req.params.tmdb_id })
            .then((data) => {
                if (data) {
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
    app.get('/api/movies/year/:min/:max', (req,resp) => {
        Movie.find()
            .where("release_date")
            .gt(req.params.min)
            .lt(req.params.max)
            .select("title")
            .exec()
            .then((data) => {
                resp.json(data);
            })
            .catch((err) => {
                resp.json({ message: "Unable to Connect to Movies"});
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