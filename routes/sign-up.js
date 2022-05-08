const router = require('express').Router();
const bcrypt = require('bcrypt');

let Patient = require('../models/patient.model');

// SIGNUP
router.route('/').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Patient.findOne({ username: req.body.username }, (err, patient) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      if (patient == null) {
        const patient = Patient({
          username: req.body.username,
          password: req.body.password,
        });
        patient.save().then((err) => {
          if (err) {
            console.log(err);
            res.json(err);
          } else {
            console.log(patient);
            res.json('Patient added!');
          }
        });
      } else {
        res.json('Username already used!');
      }
    }
  });
});

module.exports = router;
