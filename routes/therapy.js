const router = require('express').Router();
const Patient = require('../models/patient.model');
const { VALIDEXTYPES } = require('../models/exercisesInfo');
let TherapyPhase = require('../models/therapyPhase.model');

function _wrongDates(start, end) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (start < today) {
    return { error: "Start date can't be earlier then today" };
  }
  if (start - end > 0) {
    return { error: "Start date can't be earlier then end date" };
  }
}

function _wrongExTypes(types) {
  if (!types.every((el) => VALIDEXTYPES.includes(el))) {
    return { error: 'Wrong exercise types' };
  }
}

// SIGNUP
router.route('/').post((req, res) => {
  const username = req.body.username;
  const exerciseTypes = JSON.parse(req.body.exerciseTypes);
  const startDate = Date.parse(req.body.startDate);
  const endDate = Date.parse(req.body.endDate);

  const datesError = _wrongDates(startDate, endDate);
  const typesError = _wrongExTypes(exerciseTypes);

  if (typesError) {
    res.json(typesError);
  } else if (datesError) {
    res.json(datesError);
  } else {
    // dates and types are valid
    Patient.findOne({ username: username }, (err, patient) => {
      if (err) {
        res.json(err);
      } else {
        if (patient == null) {
          // no patient found, error then
          res.json({ error: 'No patient found with this username' });
        } else {
          // GOOD, patient found, let's save the TherapyPhase
          const therapyPhase = TherapyPhase({
            username: username,
            startDate: startDate,
            endDate: endDate,
            exerciseTypes: exerciseTypes,
          });

          therapyPhase
            .save()
            .then((th) => {
              res.json(th);
            })
            .catch((err) => {
              res.json({ error: 'Saving to DB failed' });
            });

          //save here
        }
      }
    });
  }
});

// if (patient == null) {
//   const patient = Patient({
//     username: username,
//     password: password,
//     fullName: fullName,
//     age: age,
//   });
//   patient
//     .save()
//     .then((pat) => {
//       res.send(pat);
//     })
//     .catch((err) => {
//       res.json({ error: 'Saving to DB failed' });
//     });
// } else {
//   res.json({ error: 'Username already taken' });
// }

module.exports = router;
