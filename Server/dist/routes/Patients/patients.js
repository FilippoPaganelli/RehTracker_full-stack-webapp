"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = void 0;
const models_1 = require("../../models");
const getPatients = async (req, res) => {
    const patients = await models_1.Patient.count();
    console.log(patients);
    models_1.Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json({ error: 'No patients found' }));
};
exports.getPatients = getPatients;
//# sourceMappingURL=patients.js.map