const router = require('express').Router();

let Patient = require('../models/patient.model');

// SIGNUP
router.route('/').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const age = req.body.age;

  Patient.findOne({ username: username }, (err, patient) => {
    if (err) {
      res.json({ error: err });
    } else {
      if (patient == null) {
        const patient = Patient({
          username: username,
          password: password,
          fullName: fullName,
          age: age,
        });

        patient
          .save()
          .then((pat) => {
            res.send(pat);
          })
          .catch((err) => {
            res.json({ error: 'Saving to DB failed' });
          });
      } else {
        res.json({ error: 'Username already taken' });
      }
    }
  });
});

module.exports = router;
