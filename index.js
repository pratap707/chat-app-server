// Import the Express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define a port for the server to listen on
const PORT = 3000;

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the Home Route!');
});
app.get('/about',(req,res)=>{
    res.send("Welcome to the about page")
})
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});