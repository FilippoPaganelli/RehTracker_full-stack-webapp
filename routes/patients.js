const router = require('express').Router();

let Patient = require('../models/patient.model');

// GET ALL
router.route('/').get((req, res) => {
    Patient.find().then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: '+ err));
});

// ADD
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newPatient = new Patient({username});

    newPatient.save()
    .then(() => res.json('Patient added!'))
    .catch(err => res.status(400).json('Error'+ err));
});

module.exports = router;