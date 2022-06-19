const router = require('express').Router();
const auths = require('../middleware/authentication');
let Patient = require('../models/patient.model');

// GET ALL
router.route('/').get(auths.auth, (req, res) => {
  Patient.find()
    .then((patients) => res.json(patients))
    .catch((err) => res.status(400).json({ error: 'No patients found' }));
});

module.exports = router;
