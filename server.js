const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

const PORT = process.env.PORT || 3001;

let dbName = 'swiPet';


const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(cors());
app.use(bodyParser.json());


require('dotenv').config();
const url = process.env.MONGODB_URI;

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db(dbName);
        // Perform a simple query to test the connection
        const result = await db.command({ ping: 1 });
        console.log("MongoDB connection test result:", result);
    } catch (e) {
        console.error('MongoDB connection error:', e);
    }
}

connectToDatabase();

const api = require('./api.js');
api.setApp(app, client);

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
  });



// Add the following for the correct retrieval path -
// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));


    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});