const router = require('express').Router();
const auth = require('../middleware/authentication');
let Exercise = require('../models/exercise.model');
let Patient = require('../models/patient.model');
let TherapyPhase = require('../models/therapyPhase.model');
const { DESCRIPTIONS } = require('../models/exercisesInfo');

// RETRIEVE EX.S BY USERNAME & DATE MOBILE
router.route('/mobile/get').post(authMobile, (req, res) => {
  const username = req.body.username;
  const date = Date.parse(req.body.date);

  TherapyPhase.find(
    {
      $and: [
        { startDate: { $lte: date } },
        { endDate: { $gte: date } },
        { username: username },
      ],
    },
    (err, therapy) => {
      if (err) {
        res.json({ error: err });
      } else {
        if (therapy == null || therapy.length == 0) {
          res.json({ error: 'No therapy found' });
        } else {
          const types = therapy[0].exerciseTypes;
          const stats = DESCRIPTIONS.filter((el) => types.includes(el.type));
          // sorting them from type '1' growing
          stats.sort((first, second) => (first.type <= second.type ? -1 : 1));
          const stringId = String(therapy[0]._id);

          Exercise.find({ therapyId: stringId }, (err, exs) => {
            if (err) res.json({ error: err });
            else {
              if (exs == null || exs.length == 0) {
                res.json(`No exercises found for therapy ${stringId}`);
              } else {
                stats.forEach((el) => {
                  exs.forEach((ex) => {
                    if (el.type === ex.type) {
                      el.exercise = ex;
                    }
                  });
                });
                res.json(stats);
              }
            }
          });
        }
      }
    }
  );
});

// RETRIEVE EX.S BY USERNAME & DATE
router.route('/get').post(auth, (req, res) => {
  const username = req.body.username;
  const date = Date.parse(req.body.date);

  TherapyPhase.find(
    {
      $and: [
        { startDate: { $lte: date } },
        { endDate: { $gte: date } },
        { username: username },
      ],
    },
    (err, therapy) => {
      if (err) {
        res.json({ error: err });
      } else {
        if (therapy == null || therapy.length == 0) {
          res.json({ error: 'No therapy found' });
        } else {
          const types = therapy[0].exerciseTypes;
          const stats = DESCRIPTIONS.filter((el) => types.includes(el.type));
          // sorting them from type '1' growing
          stats.sort((first, second) => (first.type <= second.type ? -1 : 1));
          const stringId = String(therapy[0]._id);

          Exercise.find({ therapyId: stringId }, (err, exs) => {
            if (err) res.json({ error: err });
            else {
              if (exs == null || exs.length == 0) {
                res.json(`No exercises found for therapy ${stringId}`);
              } else {
                stats.forEach((el) => {
                  exs.forEach((ex) => {
                    if (el.type === ex.type) {
                      el.exercise = ex;
                    }
                  });
                });
                res.json(stats);
              }
            }
          });
        }
      }
    }
  );
});

// ADD ONE
router.route('/').post(auth, (req, res) => {
  const username = req.body.username;
  const timestamp = Date.parse(req.body.timestamp);
  const type = parseInt(req.body.type);
  const currentSet = parseInt(req.body.currentSet);
  const repetitionInSet = parseInt(req.body.repetitionInSet);
  const therapyId = req.body.therapyId;

  Patient.findOne({ username: username }, (err, pat) => {
    if (err) {
      res.json({ error: err });
    } else {
      if (pat == null) {
        res.json({ error: 'Username is not valid' });
      } else {
        // assuming 'type' & 'timestamp' properties are valid, users won't be able to access this API
        const newExercise = Exercise({
          username: username,
          timestamp: timestamp,
          type: type,
          currentSet: currentSet,
          repetitionInSet: repetitionInSet,
          therapyId: therapyId,
        });

        newExercise
          .save()
          .then((ex) => {
            res.json(ex);
          })
          .catch((err) => {
            res.json({ error: err });
          });
      }
    }
  });
});

// UPDATE ONE
router.route('/').patch((req, res) => {
  const propToUpdate = req.body.propToUpdate;
  const valueToUpdate = req.body.valueToUpdate;
  const exId = req.body._id;
  const update = JSON.parse(`{"${propToUpdate}": ${valueToUpdate}}`);

  Exercise.findOneAndUpdate({ _id: exId }, update, { new: true }, (err, ex) => {
    if (err) {
      res.json({ error: err });
    } else {
      if (ex == null) {
        res.json({ error: 'No exercise found' });
      } else {
        // update successful, sends the updated ex back
        res.json(ex);
      }
    }
  });
});

// // ADD
// router.route('/add').post((req, res) => {
//   const username = req.body.username;
//   const description = req.body.description;
//   const type = Number(req.body.type);
//   const date = Date.parse(req.body.date);

//   const newExercise = new Exercise({
//     username,
//     description,
//     type,
//     date,
//   });

//   newExercise.save()
//   .then(() => res.json('Exercise added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// // GET BY ID
// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // DELETE BY ID
// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // UPDATE BY ID
// router.route('/update/:id').post((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => {
//       exercise.username = req.body.username;
//       exercise.description = req.body.description;
//       //exercise.duration = Number(req.body.duration);
//       exercise.date = Date.parse(req.body.date);

//       exercise.save()
//         .then(() => res.json('Exercise updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
