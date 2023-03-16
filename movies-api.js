const fs = require('fs');
const path = require ('path');
const express = require('express');

// Read from a JSON file 
const jsonPath = path.join(__dirname, 'data', 
 'movies10.json'); 
const jsonData = fs.readFileSync(jsonPath, 'utf8'); 
// convert string data into JSON object 
const movies = JSON.parse(jsonData); 

// Create an express app
const app = express();

// Return all stocks when a root request arrives
app.get('/api/movies', (req,resp) => {
    resp.json(movies)
});

// Use express to listen to a port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " +port);
});