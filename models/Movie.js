const mongoose = require('mongoose');

// Schema for the movie object, based off the Object in the MongoDB
const movieSchema = new mongoose.Schema({
    id: Number,
    tmdb_id: Number,
    imdb_id: String,
    release_date: Date,
    title: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String,
    backdrop: String,
    ratings: {
        popularity: Number,
        average: Number,
        count: Number
    },
    details: {
        overview: String,
        genres: {
            id: Number,
            name: String
        }
    }
});

// Grabbing the 'Movies-300' database for this schema
module.exports = mongoose.model('Movie', movieSchema, 'Movies-300');