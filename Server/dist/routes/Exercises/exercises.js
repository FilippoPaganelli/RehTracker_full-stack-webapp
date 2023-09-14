"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExercise = exports.createExercise = exports.getExercises = exports.mobileGetExercises = void 0;
const models_1 = require("../../models");
const mobileGetExercises = (req, res) => {
    const username = req.body.username;
    const date = Date.parse(req.body.date);
    models_1.TherapyPhase.find({
        $and: [{ startDate: { $lte: date } }, { endDate: { $gte: date } }, { username: username }],
    }, (err, therapy) => {
        if (err) {
            res.json({ error: err });
        }
        else {
            if (therapy == null || therapy.length == 0) {
                res.json({ error: 'No therapy found' });
            }
            else {
                const types = therapy[0].exerciseTypes;
                const stats = models_1.ExerciseInfo.DESCRIPTIONS.filter(el => types.includes(el.type));
                stats.sort((first, second) => (first.type <= second.type ? -1 : 1));
                const stringId = String(therapy[0]._id);
                models_1.Exercise.find({ therapyId: stringId }, (err, exs) => {
                    if (err)
                        res.json({ error: err });
                    else {
                        if (exs == null || exs.length == 0) {
                            res.json(`No exercises found for therapy ${stringId}`);
                        }
                        else {
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
    });
};
exports.mobileGetExercises = mobileGetExercises;
const getExercises = async (req, res) => {
    const username = req.body.username;
    const date = Date.parse(req.body.date);
    const therapies = await models_1.TherapyPhase.find({
        $and: [{ startDate: { $lte: date } }, { endDate: { $gte: date } }, { username: username }],
    });
    console.log(therapies);
    if (therapies === null || therapies.length == 0) {
        res.json({ error: 'No therapy found' });
    }
    else {
        const types = therapies[0].exerciseTypes;
        const stats = models_1.ExerciseInfo.DESCRIPTIONS.filter(el => types.includes(el.type));
        stats.sort((first, second) => (first.type <= second.type ? -1 : 1));
        const stringId = String(therapies[0]._id);
        const exercises = await models_1.Exercise.find({ therapyId: stringId });
        if (exercises === null || exercises.length == 0) {
            res.json(`No exercises found for therapy ${stringId}`);
        }
        else {
            stats.forEach((el) => {
                exercises.forEach((ex) => {
                    if (el.type === ex.type) {
                        el.exercise = ex;
                    }
                });
            });
            res.json(stats);
        }
    }
};
exports.getExercises = getExercises;
const createExercise = (req, res) => {
    const username = req.body.username;
    const timestamp = Date.parse(req.body.timestamp);
    const type = parseInt(req.body.type);
    const currentSet = parseInt(req.body.currentSet);
    const repetitionInSet = parseInt(req.body.repetitionInSet);
    const therapyId = req.body.therapyId;
    models_1.Patient.findOne({ username: username }, (err, pat) => {
        if (err) {
            res.json({ error: err });
        }
        else {
            if (pat == null) {
                res.json({ error: 'Username is not valid' });
            }
            else {
                const newExercise = new models_1.Exercise({
                    username: username,
                    timestamp: timestamp,
                    type: type,
                    currentSet: currentSet,
                    repetitionInSet: repetitionInSet,
                    therapyId: therapyId,
                });
                newExercise
                    .save()
                    .then(ex => {
                    res.json(ex);
                })
                    .catch(err => {
                    res.json({ error: err });
                });
            }
        }
    });
};
exports.createExercise = createExercise;
const updateExercise = (req, res) => {
    const propToUpdate = req.body.propToUpdate;
    const valueToUpdate = req.body.valueToUpdate;
    const exId = req.body._id;
    const update = JSON.parse(`{"${propToUpdate}": ${valueToUpdate}}`);
    const exercise = models_1.Exercise.findOneAndUpdate({ _id: exId }, update, { new: true });
    if (exercise === null) {
        res.json({ error: 'No exercise found' });
    }
    else {
        res.json(exercise);
    }
};
exports.updateExercise = updateExercise;
//# sourceMappingURL=exercises.js.map