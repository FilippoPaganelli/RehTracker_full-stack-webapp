const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DB
//const uri = process.env.ATLAS_DB_URI;
const uri = process.env.MONGO_DB;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', ()=> {console.log('-DB: connected successfully');});

// routes
const exercisesRouter = require('./routes/exercises');
const patientsRouter = require('./routes/patients');

app.use('/exercises', exercisesRouter);
app.use('/patients', patientsRouter);

// Heroku stuff for locating frontend in production
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'));
}

// listening
app.listen(PORT, ()=>{console.log(`-server: listening on port ${PORT}`);});
