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

module.exports = {
    handleAllMovies
}