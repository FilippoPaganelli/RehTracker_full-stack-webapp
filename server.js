const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(cookieParser());

// ------------------------------------------------------- DB
const uri = process.env.MONGO_DB
  ? process.env.MONGO_DB
  : process.env.ATLAS_DB_URI;

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('-DB: connected successfully');
});

// ------------------------------------------------------- routes
const exercisesRouter = require('./routes/exercises');
const patientsRouter = require('./routes/patients');
const signupRouter = require('./routes/sign-up');
const authRouter = require('./routes/authRoutes');
const therapyRouter = require('./routes/therapy');

app.use('/api/exercises', exercisesRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/sign-up', signupRouter);
app.use('/api/auth', authRouter);
app.use('/api/therapy', therapyRouter);

// Heroku constant for locating frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

// listening
app.listen(PORT, () => {
  console.log(`-server: listening on port ${PORT}`);
});
