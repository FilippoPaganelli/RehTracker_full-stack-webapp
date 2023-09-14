"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_WORK_FACTOR = 10;
const patientSchema = new mongoose_1.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: 'patients',
});
patientSchema.pre('save', function (next) {
    const patient = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt_1.default.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            }
            else {
                bcrypt_1.default.hash(patient.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }
                    patient.password = hash;
                    return next();
                });
            }
        });
    }
    else {
        return next();
    }
});
patientSchema.method('comparePassword', function comparePassword(password, callback) {
    bcrypt_1.default.compare(password, this.password, (error, isMatch) => {
        if (error) {
            return false;
        }
        callback(null, isMatch);
    });
});
exports.Patient = (0, mongoose_1.model)('Patient', patientSchema);
//# sourceMappingURL=patient.model.js.map