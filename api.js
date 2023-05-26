const express = require('express');
const sql = require('./sql_functions');
// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.get('/', (req, res) => {
    res.send('hello world');
    
});
app.get('/recent', (req, res) => {
    
    sql.recentData().then(resp => {
        res.send(resp)
    }).catch(e => {
        console.log(e);
        res.send('Error');
    })
    
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});