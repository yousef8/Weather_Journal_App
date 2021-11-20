// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');
const cors = require('cors');
const bp = require('body-parser');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bp.urlencoded({extended: false}));

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8080;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Running on localhost:${port}`);
}

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
