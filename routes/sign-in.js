const router = require('express').Router();
const jwt = require('jsonwebtoken');

let Patient = require('../models/patient.model');
const TOKEN_DURATION = '30s';

// SIGNEDIN
router.route('/signed-in').get((req, res) => {
  try {
    const token = req.cookies.token;
    if (!token || token === '') {
      res.json(false);
    } else {
      jwt.verify(token, process.env.SESSION_SECRET);
      // ADD SOME TIMEOUT LOGIC HERE! ---------------------------------------
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

module.exports = router;
