"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileSignedIn = exports.signUp = exports.signIn = exports.signOut = exports.signedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../../models");
const TOKEN_DURATION = '600s';
const signedIn = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token || token === '' || !process.env.SESSION_SECRET) {
            res.json(false);
        }
        else {
            jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET);
            res.json(true);
        }
    }
    catch (error) {
        res.json(false);
    }
};
exports.signedIn = signedIn;
const signOut = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(),
    }).send();
};
exports.signOut = signOut;
const signIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const patient = await models_1.Patient.findOne({ username: username });
    if (!patient) {
        res.json({ error: 'Could not find a patient' });
    }
    else {
        patient.comparePassword(password, (error, isMatch) => {
            if (!isMatch) {
                res.json({ error: 'Wrong username or password' });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ username: username }, process.env.SESSION_SECRET ?? '', {
                    expiresIn: TOKEN_DURATION,
                });
                res.cookie('token', token, { httpOnly: true }).send();
            }
        });
    }
};
exports.signIn = signIn;
const signUp = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const age = req.body.age;
    const patient = await models_1.Patient.findOne({ username: username });
    if (patient === null) {
        const patient = new models_1.Patient({
            username: username,
            password: password,
            fullName: fullName,
            age: age,
        });
        patient
            .save()
            .then(pat => {
            res.send(pat);
        })
            .catch(err => {
            res.json({ error: 'Saving to DB failed' });
        });
    }
    else {
        res.json({ error: 'Username already taken' });
    }
};
exports.signUp = signUp;
const mobileSignedIn = (req, res) => {
    try {
        const token = req.body.token;
        if (!token || token === '') {
            res.json(false);
        }
        else {
            jsonwebtoken_1.default.verify(token, process.env.SESSION_SECRET ?? '');
            res.json(true);
        }
    }
    catch (error) {
        res.json(false);
    }
};
exports.mobileSignedIn = mobileSignedIn;
//# sourceMappingURL=authRoutes.js.map