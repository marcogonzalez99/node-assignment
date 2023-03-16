const movieController = require('./movieController.js');

// Return all the movies in the list
const handleAllMovies = (movies, app) => {
    //Return all movies when a root request arrives
    app.get('/', (req,resp) => {
        resp.json(movies)
    });
}

module.exports = {
    handleAllMovies
}