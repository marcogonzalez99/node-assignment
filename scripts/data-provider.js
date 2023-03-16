const path = require("path"); 
const fs = require("fs"); 

// Read from a JSON file 
const jsonPath = path.join(__dirname, '../data', 
 'movies10.json'); 
const jsonData = fs.readFileSync(jsonPath, 'utf8'); 
// convert string data into JSON object 
const movies = JSON.parse(jsonData); 


module.exports = movies;