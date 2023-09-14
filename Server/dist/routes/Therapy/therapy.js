"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTherapy = void 0;
const models_1 = require("../../models");
function _wrongDates(start, end) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today.getDate()) {
        return { error: "Start date can't be earlier then today" };
    }
    if (start - end > 0) {
        return { error: "Start date can't be earlier then end date" };
    }
}
function _wrongExTypes(types) {
    if (!types.every(type => models_1.ExerciseInfo.VALIDEXTYPES.includes(type))) {
        return { error: 'Wrong exercise types' };
    }
}
const createTherapy = (req, res) => {
    const username = req.body.username;
    const exerciseTypes = JSON.parse(req.body.exerciseTypes);
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    const datesError = _wrongDates(startDate, endDate);
    const typesError = _wrongExTypes(exerciseTypes);
    if (typesError) {
        res.json(typesError);
    }
    else if (datesError) {
        res.json(datesError);
    }
    else {
        const patient = models_1.Patient.findOne({ username: username });
        if (patient === null) {
            res.json({ error: 'No patient found with this username' });
        }
        else {
            const therapyPhase = new models_1.TherapyPhase({
                username: username,
                startDate: startDate,
                endDate: endDate,
                exerciseTypes: exerciseTypes,
            });
            therapyPhase
                .save()
                .then((therapyPhase) => {
                res.json(therapyPhase);
            })
                .catch((err) => {
                res.json({ error: 'Saving to DB failed' });
            });
        }
    }
};
exports.createTherapy = createTherapy;
//# sourceMappingURL=therapy.js.map