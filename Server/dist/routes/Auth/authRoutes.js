"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileSignedIn = exports.signUp = exports.signIn = exports.signOut = exports.signedIn = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const shared_1 = require("../../shared");
const models_1 = require("../../models");
const TOKEN_DURATION = process.env.NODE_ENV === 'production' ? '600s' : '3600s';
const signedIn = (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token || token === '' || !process.env.SESSION_SECRET) {
            res.json({ username: null });
        }
        else {
            const verified = jwt.verify(token, process.env.SESSION_SECRET);
            if (!verified.username) {
                res.json({ username: null });
            }
            res.json({ username: verified.username });
        }
    }
    catch (error) {
        shared_1.logger.error(error);
        res.json({ username: null });
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
                const token = jwt.sign({ username: username }, process.env.SESSION_SECRET ?? '', {
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
            jwt.verify(token, process.env.SESSION_SECRET ?? '');
            res.json(true);
        }
    }
    catch (error) {
        res.json(false);
    }
};
exports.mobileSignedIn = mobileSignedIn;
//# sourceMappingURL=authRoutes.js.map