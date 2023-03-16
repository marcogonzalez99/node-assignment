const fs = require('fs');
const path = require ('path');
const express = require('express');

// Create an express app
const app = express();

// Reference Modules
const movies = require('./scripts/data-provider.js')

// Return all stocks when a root request arrives
app.get('/', (req,resp) => {
    resp.json(movies)
});

// Return all stocks when a root request arrives
app.get('/api/movies', (req,resp) => {
    resp.json(movies)
});

// Use express to listen to a port
let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " +port);
});