const router = require('express').Router();
const jwt = require('jsonwebtoken');

let Patient = require('../models/patient.model');
const TOKEN_DURATION = '600s';

// SIGNEDIN
router.route('/signed-in').get((req, res) => {
  try {
    const token = req.cookies.token;
    if (!token || token === '') {
      res.json(false);
    } else {
      // timeout logic is inside of the token from its generation
      jwt.verify(token, process.env.SESSION_SECRET);
      res.json(true);
    }
  } catch (error) {
    res.json(false);
  }
});

// SIGNOUT
router.route('/sign-out').get((req, res) => {
  res
    .cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// SIGNIN
router.route('/sign-in').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Patient.findOne({ username: username }).exec(function (error, patient) {
    if (error) {
      res.json({ error: 'Error from database' });
    } else if (!patient) {
      res.json({ error: 'Wrong username or password' });
    } else {
      patient.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          res.json({ error: 'Error from backend' });
        } else if (!isMatch) {
          res.json({ error: 'Wrong username or password' });
        } else {
          // password is correct
          const token = jwt.sign(
            { username: username },
            process.env.SESSION_SECRET,
            {
              expiresIn: TOKEN_DURATION,
            }
          );
          // sending the token for authentication
          res
            // .json({ username: req.username })
            .cookie('token', token, { httpOnly: true })
            .send();
        }
      });
    }
  });
});

// SIGNIN MOBILE
router.route('/mobile/sign-in').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Patient.findOne({ username: username }).exec(function (error, patient) {
    if (error) {
      res.status(500).json({ error: 'Error from database' });
    } else if (!patient) {
      res.status(400).json({ error: 'Wrong username or password' });
    } else {
      patient.comparePassword(password, function (matchError, isMatch) {
        if (matchError) {
          res.status(500).json({ error: 'Error from backend' });
        } else if (!isMatch) {
          res.status(400).json({ error: 'Wrong username or password' });
        } else {
          // password is correct
          const token = jwt.sign(
            { username: username },
            process.env.SESSION_SECRET,
            {
              expiresIn: TOKEN_DURATION,
            }
          );
          // sending the token for authentication
          res.status(200).json({ token: token });
        }
      });
    }
  });
});

module.exports = router;
