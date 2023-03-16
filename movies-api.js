const path = require ('path');
const fs = require('fs');
const express = require('express');

// Create an express app
const app = express();

// Provide access to form query string data
app.use(express.urlencoded({ extended: true}));

// const movieProvider = require("./scripts/data-provider.js");
const movieRouter = require("./scripts/movie-router.js");

// Read from a JSON file 
const jsonPath = path.join(__dirname, './data', 
 'movies10.json'); 
const jsonData = fs.readFileSync(jsonPath, 'utf8'); 
// convert string data into JSON object 
const movies = JSON.parse(jsonData); 

// Handler
movieRouter.handleAllMovies(movies,app);

// Use express to listen to a port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " +port);
});